$(document).ready(function () {
  // Theme Onload Toast
  //****************************
  window.addEventListener("load", () => {
    let myAlert = document.querySelectorAll(".toast")[0];
    if (myAlert) {
      let bsAlert = new bootstrap.Toast(myAlert);
      bsAlert.show();
    }
  });
  if (typeof $.fn.owlCarousel !== "undefined") {
    $(".counter-carousel").owlCarousel({
      loop: true,
      rtl: true,
      margin: 30,
      mouseDrag: true,

      nav: false,

      responsive: {
        0: {
          items: 2,
          loop: true,
        },
        576: {
          items: 2,
          loop: true,
        },
        768: {
          items: 3,
          loop: true,
        },
        1200: {
          items: 5,
          loop: true,
        },
        1400: {
          items: 6,
          loop: true,
        },
      },
    });
  } else {
    console.error("Owl Carousel plugin is not loaded.");
  }
  // =====================================
  // Profit
  // =====================================
  var chart = {
    series: [
      {
        name: "Eanings this month in Lakh",
        data: [4000, 7000, 9000, 5000, 40000, 30000],
      },
      {
        name: "Expense this month",
        data: [-3000, -1999, -2000, -1500, -6000, -18000],
      },
    ],
    chart: {
      toolbar: {
        show: false,
      },
      type: "bar",
      fontFamily: "inherit",
      foreColor: "#adb0bb",
      height: 310,
      stacked: true,
    },
    colors: ["var(--bs-primary)", "var(--bs-secondary)"],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "20%",
        borderRadius: [6],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    yaxis: {
      min: -100000,
      max: 100000,
      title: {
        text: "Age",
      },
    },
    xaxis: {
      axisBorder: {
        show: true,
      },
      categories: ["JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    },
    yaxis: {
      tickAmount: 4,
    },
    tooltip: {
      theme: "dark",
    },
  };

  var chart = new ApexCharts(document.querySelector("#chart"), chart);
  chart.render();

  // =====================================
  // Breakup
  // =====================================
  var breakup = {
    color: "#adb5bd",
    series: [38, 40],
    labels: ["2024", "2023"],
    chart: {
      width: 180,
      type: "donut",
      fontFamily: "inherit",
      foreColor: "#adb0bb",
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
        },
      },
    },
    stroke: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },

    legend: {
      show: false,
    },
    colors: ["var(--bs-primary)", "#ecf2ff", "var(--bs-card-bg)"],

    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
    },
  };

  var chart = new ApexCharts(document.querySelector("#breakup"), breakup);
  chart.render();

  // =====================================
  // Earning
  // =====================================
  var earning = {
    chart: {
      id: "sparkline3",
      type: "area",
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
      fontFamily: "inherit",
      foreColor: "#adb0bb",
    },
    series: [
      {
        name: "Earnings",
        color: "var(--bs-secondary)",
        data: [25, 66, 20, 40, 12, 58, 20],
      },
    ],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.15,
        opacityTo: 0,
        stops: [20, 180],
      },
      opacity: 0.5,
    },

    markers: {
      size: 0,
    },
    tooltip: {
      theme: "dark",
      fixed: {
        enabled: true,
        position: "right",
      },
      x: {
        show: false,
      },
    },
  };
  new ApexCharts(document.querySelector("#earning"), earning).render();

  // =====================================
  // Customers
  // =====================================
  var customers = {
    chart: {
      id: "sparkline3",
      type: "area",
      fontFamily: "inherit",
      foreColor: "#adb0bb",
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
    },
    series: [
      {
        name: "Customers",
        color: "var(--bs-secondary)",
        data: [30, 25, 35, 20, 30, 40],
      },
    ],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.12,
        opacityTo: 0,
        stops: [20, 180],
      },
    },

    markers: {
      size: 0,
    },
    tooltip: {
      theme: "dark",
      fixed: {
        enabled: true,
        position: "right",
      },
      x: {
        show: false,
      },
    },
  };
  new ApexCharts(document.querySelector("#customers"), customers).render();

  // =====================================
  // Projects
  // =====================================
  var projects = {
    series: [
      {
        name: "",
        data: [4, 10, 9, 7, 9, 10, 11, 8, 10, 9],
      },
    ],
    chart: {
      type: "bar",
      fontFamily: "inherit",
      foreColor: "#adb0bb",
      height: 70,

      resize: true,
      barColor: "#fff",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    colors: ["var(--bs-primary)"],
    grid: {
      show: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        startingShape: "flat",
        endingShape: "flat",
        columnWidth: "60%",
        barHeight: "20%",
        endingShape: "rounded",
        distributed: true,
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2.5,
      colors: ["rgba(0,0,0,0.01)"],
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    axisBorder: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "12px",
      },
      x: {
        show: false,
      },
    },
  };

  var chart_column_basic = new ApexCharts(
    document.querySelector("#projects"),
    projects
  );
  chart_column_basic.render();

  // =====================================
  // Stats
  // =====================================
  var stats = {
    chart: {
      id: "sparkline3",
      type: "area",
      height: 180,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
      fontFamily: "inherit",
      foreColor: "#adb0bb",
    },
    series: [
      {
        name: "Weekly Stats",
        color: "var(--bs-primary)",
        data: [5, 15, 10, 20],
      },
    ],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.2,
        opacityTo: 0,
        stops: [20, 180],
      },
    },

    markers: {
      size: 0,
    },
    tooltip: {
      theme: "dark",
      fixed: {
        enabled: true,
        position: "right",
      },
      x: {
        show: false,
      },
    },
  };
  new ApexCharts(document.querySelector("#stats"), stats).render();
});
