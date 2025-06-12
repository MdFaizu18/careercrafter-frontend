'use client';

import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { TrendingUp, TrendingDown, Users, Calendar, UserCheck, ArrowRight } from 'lucide-react';

// Enhanced data with more detailed time periods
const chartDataSets = {
  '7days': {
    // More detailed day labels with dates
    categories: ['Mon ', 'Tue ', 'Wed ', 'Thu ', 'Fri ', 'Sat ', 'Sun '],
    applications: [15, 23, 18, 31, 28, 12, 8],
    interviews: [3, 5, 4, 7, 6, 2, 1],
    hires: [0, 1, 0, 2, 1, 0, 0],
    previousPeriod: { applications: 120, interviews: 25, hires: 3 },
  },
  '30days': {
    // Weekly breakdown with date ranges
    categories: ['May 13-19', 'May 20-26', 'May 27-Jun 2', 'Jun 3-9'],
    applications: [89, 76, 94, 112],
    interviews: [18, 15, 21, 24],
    hires: [3, 2, 4, 5],
    previousPeriod: { applications: 340, interviews: 68, hires: 12 },
  },
  '90days': {
    // Monthly breakdown with month names
    categories: ['March 2025', 'April 2025', 'May 2025'],
    applications: [245, 198, 287],
    interviews: [52, 41, 63],
    hires: [12, 8, 15],
    previousPeriod: { applications: 680, interviews: 140, hires: 28 },
  },
  '12months': {
    // Monthly breakdown for the full year
    categories: [
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
    ],
    applications: [210, 185, 195, 240, 260, 190, 170, 220, 250, 245, 198, 287],
    interviews: [45, 38, 42, 51, 55, 40, 36, 47, 53, 52, 41, 63],
    hires: [10, 8, 9, 12, 14, 9, 7, 11, 13, 12, 8, 15],
    previousPeriod: { applications: 2400, interviews: 510, hires: 120 },
  },
};

const EmployerApplicationsChart = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [animatedValues, setAnimatedValues] = useState({
    applications: 0,
    interviews: 0,
    hires: 0,
  });
  const [showAllMetrics, setShowAllMetrics] = useState(false);
  const data = chartDataSets[timeRange];

  // Calculate totals and conversion rates
  const totals = {
    applications: data.applications.reduce((a, b) => a + b, 0),
    interviews: data.interviews.reduce((a, b) => a + b, 0),
    hires: data.hires.reduce((a, b) => a + b, 0),
  };

  const conversionRates = {
    interviewRate: totals.applications > 0 ? (totals.interviews / totals.applications) * 100 : 0,
    hireRate: totals.interviews > 0 ? (totals.hires / totals.interviews) * 100 : 0,
    overallRate: totals.applications > 0 ? (totals.hires / totals.applications) * 100 : 0,
  };

  // Calculate trends
  const trends = {
    applications:
      ((totals.applications - data.previousPeriod.applications) /
        data.previousPeriod.applications) *
      100,
    interviews:
      ((totals.interviews - data.previousPeriod.interviews) / data.previousPeriod.interviews) * 100,
    hires: ((totals.hires - data.previousPeriod.hires) / data.previousPeriod.hires) * 100,
  };

  // Animate numbers on mount and time range change
  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedValues({
        applications: Math.floor(totals.applications * progress),
        interviews: Math.floor(totals.interviews * progress),
        hires: Math.floor(totals.hires * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedValues(totals);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [timeRange]);

  // Enhanced chart options with better time period display
  const chartOptions = {
    chart: {
      type: 'area',
      height: 280,
      toolbar: { show: false },
      background: 'transparent',
      fontFamily: 'Inter, sans-serif',
      sparkline: { enabled: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
    },
    colors: showAllMetrics ? ['#8B5CF6', '#3B82F6', '#10B981'] : ['#8B5CF6'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: showAllMetrics ? ['#C084FC', '#93C5FD', '#6EE7B7'] : ['#C084FC'],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: data.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: '#9CA3AF',
          fontSize: '12px',
          fontWeight: 500,
        },
        // Rotate labels for better readability when we have longer text
        rotate: timeRange === '30days' ? -45 : 0,
        rotateAlways: timeRange === '30days',
      },
    },
    yaxis: {
      show: true,
      labels: {
        style: {
          colors: '#9CA3AF',
          fontSize: '12px',
        },
        formatter: value => Math.round(value),
      },
    },
    grid: {
      borderColor: '#F3F4F6',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 10,
      },
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: (val, { seriesIndex }) => {
          if (!showAllMetrics) return val + ' applications';
          const labels = ['applications', 'interviews', 'hires'];
          return val + ' ' + labels[seriesIndex];
        },
      },
      x: {
        formatter: val => {
          // Format the tooltip title based on time range
          if (timeRange === '7days') {
            return data.categories[val - 1];
          } else if (timeRange === '30days') {
            return 'Week: ' + data.categories[val - 1];
          } else {
            return data.categories[val - 1];
          }
        },
      },
    },
    legend: {
      show: showAllMetrics,
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '12px',
      fontWeight: 500,
      labels: {
        colors: '#374151',
      },
      markers: {
        width: 8,
        height: 8,
        radius: 2,
      },
    },
  };

  // Chart series based on whether we're showing all metrics or just applications
  const chartSeries = showAllMetrics
    ? [
        {
          name: 'Applications',
          data: data.applications,
        },
        {
          name: 'Interviews',
          data: data.interviews,
        },
        {
          name: 'Hires',
          data: data.hires,
        },
      ]
    : [
        {
          name: 'Applications',
          data: data.applications,
        },
      ];

  const ConversionFlow = () => (
    <div className="mt-8 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Conversion Funnel</h3>
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{totals.applications}</div>
          <div className="text-sm text-gray-600">Applications</div>
        </div>

        <div className="my-4 flex items-center space-x-2 md:my-0">
          <ArrowRight className="h-5 w-5 text-gray-400" />
          <div className="text-center">
            <div className="text-sm font-medium text-blue-600">
              {conversionRates.interviewRate.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500">conversion</div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{totals.interviews}</div>
          <div className="text-sm text-gray-600">Interviews</div>
        </div>

        <div className="my-4 flex items-center space-x-2 md:my-0">
          <ArrowRight className="h-5 w-5 text-gray-400" />
          <div className="text-center">
            <div className="text-sm font-medium text-green-600">
              {conversionRates.hireRate.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500">conversion</div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{totals.hires}</div>
          <div className="text-sm text-gray-600">Hires</div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <div className="inline-flex items-center space-x-2 rounded-full bg-white px-4 py-2 shadow-sm">
          <span className="text-sm text-gray-600">Overall conversion rate:</span>
          <span className="font-bold text-purple-600">
            {conversionRates.overallRate.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );

  // Get the appropriate title based on time range
  const getTimeRangeTitle = () => {
    switch (timeRange) {
      case '7days':
        return 'Daily Breakdown (Last 7 Days)';
      case '30days':
        return 'Weekly Breakdown (Last 30 Days)';
      case '90days':
        return 'Monthly Breakdown (Last 3 Months)';
      case '12months':
        return 'Monthly Breakdown (Last 12 Months)';
      default:
        return 'Applications Trend';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Recruitment Analytics</h2>
          <p className="text-gray-600">Track your hiring performance and trends</p>
        </div>
        <div className="flex items-center gap-3">
          {/* <button
            onClick={() => setShowAllMetrics(!showAllMetrics)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              showAllMetrics ? "bg-purple-100 text-purple-700" : "bg-white text-gray-700 shadow-sm hover:bg-gray-50"
            }`}
          >
            {showAllMetrics ? "Show Applications Only" : "Show All Metrics"}
          </button> */}
          <select
            className="rounded-xl border-0 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all focus:ring-2 focus:ring-purple-500"
            value={timeRange}
            onChange={e => setTimeRange(e.target.value)}
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 3 months</option>
            <option value="12months">Last 12 months</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{getTimeRangeTitle()}</h3>
            {/* <p className="text-sm text-gray-600">
              {showAllMetrics ? "Applications, interviews, and hires over time" : "Application volume over time"}
            </p> */}
          </div>

          {/* Time period indicator */}
          <div className="hidden rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 md:block">
            {timeRange === '7days'
              ? 'Jun 5 - Jun 11, 2025'
              : timeRange === '30days'
                ? 'May 13 - Jun 11, 2025'
                : timeRange === '90days'
                  ? 'Mar 13 - Jun 11, 2025'
                  : 'Jun 2024 - May 2025'}
          </div>
        </div>

        <ReactApexChart options={chartOptions} series={chartSeries} type="area" height={280} />
      </div>

      {/* Conversion Funnel */}
    </div>
  );
};

export default EmployerApplicationsChart;
