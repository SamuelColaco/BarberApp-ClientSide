import { useRef, useEffect, useState } from 'react';
import { Chart, type ChartConfiguration } from 'chart.js/auto';
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import 'chartjs-adapter-date-fns';
import api from '../../services/api';

interface Appointment {
  id: string;
  serviceName: string;
  barberName: string;
  date: string; // ISO format (e.g., "2023-07-03")
  hour: string;
  status: 'pending' | 'confirmed' | 'canceled';
}

export function AppointmentChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get("/appointment");
        const data = await response.data.message;
        const appointmentData = Array.isArray(data) ? data : [];
        setAppointments(appointmentData);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    if (!chartRef.current || appointments.length === 0) return;

    // Contar agendamentos por data
    const appointmentsByDate: Record<string, number> = {};

    appointments.forEach((appointment) => {
      const date = appointment.date.split('T')[0];
      appointmentsByDate[date] = (appointmentsByDate[date] || 0) + 1;
    });

    // Converter para array de objetos Date e ordenar
    const sortedData = Object.entries(appointmentsByDate)
      .map(([date, count]) => ({
        date: parseISO(date), // Converter para objeto Date usando parseISO
        count
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    const data = {
      // Usar objetos Date diretamente nos labels
      labels: sortedData.map(item => item.date),
      datasets: [{
        label: 'Agendamentos',
        data: sortedData.map(item => item.count),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };

    const config: ChartConfiguration<'bar', number[], Date> = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'd MMM' // Formato: "3 Jul"
              },
              tooltipFormat: 'dd/MM/yyyy'
            },
            title: {
              display: true,
              text: 'Data'
            },
            ticks: {
              source: 'data',
              callback: (value) => {
                if (typeof value === 'string') return value;
                const date = new Date(value);
                return format(date, 'd MMM', { locale: ptBR });
              }
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Quantidade'
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: (context) => {
                const date = new Date(context[0].label);
                return format(date, 'PPPP', { locale: ptBR }); // Formato completo
              },
              label: (context) => {
                return `${context.parsed.y} agendamentos`;
              }
            }
          }
        }
      }
    };

    const myChart = new Chart(chartRef.current, config);

    return () => myChart.destroy();
  }, [appointments]);

  if (loading) return <div>Carregando...</div>;
  if (appointments.length === 0) return <div>Nenhum agendamento encontrado</div>;

  return (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <h2>Agendamentos</h2>
      <canvas ref={chartRef} />
    </div>
  );
}