/**
 * CoolAdmin Main JavaScript - Vanilla JS Version
 * Converted from jQuery to pure JavaScript
 */

// Chart.js configurations (already using vanilla JS)
(() => {
  "use strict";

  try {
    //WidgetChart 1
    var ctx = document.getElementById("widgetChart1");
    if (ctx) {
      ctx.height = 130;
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          type: 'line',
          datasets: [{
            data: [78, 81, 80, 45, 34, 12, 40],
            label: 'Dataset',
            backgroundColor: 'rgba(255,255,255,.1)',
            borderColor: 'rgba(255,255,255,.55)',
          },]
        },
        options: {
          maintainAspectRatio: true,
          legend: {
            display: false
          },
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }
          },
          responsive: true,
          scales: {
            xAxes: [{
              gridLines: {
                color: 'transparent',
                zeroLineColor: 'transparent'
              },
              ticks: {
                fontSize: 2,
                fontColor: 'transparent'
              }
            }],
            yAxes: [{
              display: false,
              ticks: {
                display: false,
              }
            }]
          },
          title: {
            display: false,
          },
          elements: {
            line: {
              borderWidth: 0
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4
            }
          }
        }
      });
    }

    //WidgetChart 2
    var ctx = document.getElementById("widgetChart2");
    if (ctx) {
      ctx.height = 130;
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          type: 'line',
          datasets: [{
            data: [1, 18, 9, 17, 34, 22],
            label: 'Dataset',
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,255,.55)',
          },]
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          responsive: true,
          tooltips: {
            mode: 'index',
            titleFontSize: 12,
            titleFontColor: '#000',
            bodyFontColor: '#000',
            backgroundColor: '#fff',
            titleFontFamily: 'Poppins',
            bodyFontFamily: 'Poppins',
            cornerRadius: 3,
            intersect: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                color: 'transparent',
                zeroLineColor: 'transparent'
              },
              ticks: {
                fontSize: 2,
                fontColor: 'transparent'
              }
            }],
            yAxes: [{
              display: false,
              ticks: {
                display: false,
              }
            }]
          },
          title: {
            display: false,
          },
          elements: {
            line: {
              tension: 0.00001,
              borderWidth: 1
            },
            point: {
              radius: 4,
              hitRadius: 10,
              hoverRadius: 4
            }
          }
        }
      });
    }

    //WidgetChart 3
    var ctx = document.getElementById("widgetChart3");
    if (ctx) {
      ctx.height = 130;
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          type: 'line',
          datasets: [{
            data: [65, 59, 84, 84, 51, 55],
            label: 'Dataset',
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,255,.55)',
          },]
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          responsive: true,
          tooltips: {
            mode: 'index',
            titleFontSize: 12,
            titleFontColor: '#000',
            bodyFontColor: '#000',
            backgroundColor: '#fff',
            titleFontFamily: 'Poppins',
            bodyFontFamily: 'Poppins',
            cornerRadius: 3,
            intersect: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                color: 'transparent',
                zeroLineColor: 'transparent'
              },
              ticks: {
                fontSize: 2,
                fontColor: 'transparent'
              }
            }],
            yAxes: [{
              display: false,
              ticks: {
                display: false,
              }
            }]
          },
          title: {
            display: false,
          },
          elements: {
            line: {
              borderWidth: 1
            },
            point: {
              radius: 4,
              hitRadius: 10,
              hoverRadius: 4
            }
          }
        }
      });
    }

    //WidgetChart 4
    var ctx = document.getElementById("widgetChart4");
    if (ctx) {
      ctx.height = 115;
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
            label: "My First dataset",
            data: [78, 81, 80, 65, 58, 75, 60, 75, 65, 60, 60, 75],
            borderColor: "transparent",
            borderWidth: "0",
            backgroundColor: "rgba(255,255,255,.3)"
          }]
        },
        options: {
          maintainAspectRatio: true,
          legend: {
            display: false
          },
          responsive: true,
          scales: {
            xAxes: [{
              gridLines: {
                color: 'transparent',
                zeroLineColor: 'transparent'
              },
              ticks: {
                fontSize: 2,
                fontColor: 'transparent'
              }
            }],
            yAxes: [{
              display: false,
              ticks: {
                display: false,
              }
            }]
          },
          title: {
            display: false,
          },
          elements: {
            rectangle: {
              borderWidth: 0,
            }
          }
        }
      });
    }

    //Recent Report Chart
    var ctx = document.getElementById("recent-rep-chart");
    if (ctx) {
      ctx.height = 250;
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', ''],
          datasets: [{
            label: 'Products',
            backgroundColor: 'rgba(0, 181, 233, 0.4)',
            borderColor: '#00b5e9',
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: [78, 81, 80, 65, 58, 75, 60, 75, 65, 70]
          }, {
            label: 'Services',
            backgroundColor: 'rgba(250, 66, 81, 0.4)',
            borderColor: '#fa4251',
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: [65, 59, 84, 84, 51, 55, 40, 45, 50, 55]
          }]
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 15,
              fontSize: 12
            }
          },
          responsive: true,
          scales: {
            xAxes: [{
              gridLines: {
                drawOnChartArea: false,
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
              }
            }]
          },
          elements: {
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            }
          }
        }
      });
    }

    //Percent Chart
    var ctx = document.getElementById("percent-chart");
    if (ctx) {
      ctx.height = 280;
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            label: "Revenue Distribution",
            data: [35, 25, 20, 12, 8],
            backgroundColor: [
              '#00b5e9',
              '#fa4251',
              '#28a745',
              '#ff6b35',
              '#6f42c1'
            ],
            hoverBackgroundColor: [
              '#0099cc',
              '#e63946',
              '#20a745',
              '#ff5722',
              '#5e35b1'
            ],
            borderWidth: [2, 2, 2, 2, 2],
            hoverBorderColor: [
              '#ffffff',
              '#ffffff',
              '#ffffff',
              '#ffffff',
              '#ffffff'
            ]
          }],
          labels: [
            'Products',
            'Services',
            'Consulting',
            'Support',
            'Training'
          ]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          cutoutPercentage: 75,
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 15,
              fontSize: 12
            }
          },
          animation: {
            animateScale: true,
            animateRotate: true
          },
          tooltips: {
            backgroundColor: '#fff',
            titleFontColor: '#333',
            bodyFontColor: '#666',
            borderColor: '#ddd',
            borderWidth: 1,
            callbacks: {
              label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var value = dataset.data[tooltipItem.index];
                var label = data.labels[tooltipItem.index];
                return label + ': ' + value + '%';
              }
            }
          }
        }
      });
    }

  } catch (error) {
    console.log(error);
  }
})();

// Animsition removed - using CSS transitions instead

// Recent Report Chart 2 for index2.html
(() => {
  "use strict";
  
  try {
    var ctx = document.getElementById("recent-rep2-chart");
    if (ctx) {
      ctx.height = 320;
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
            label: 'Products',
            backgroundColor: 'rgba(0, 181, 233, 0.2)',
            borderColor: '#00b5e9',
            data: [65, 59, 84, 84, 51, 55, 40, 45, 50, 55, 70, 80],
            pointBackgroundColor: '#00b5e9',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            fill: true,
            tension: 0.4
          }, {
            label: 'Services',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            borderColor: '#4caf50',
            data: [28, 48, 40, 19, 86, 27, 90, 70, 65, 85, 60, 75],
            pointBackgroundColor: '#4caf50',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: '#fff',
              titleColor: '#333',
              bodyColor: '#666',
              borderColor: '#ddd',
              borderWidth: 1,
              titleFont: {
                family: 'Poppins'
              },
              bodyFont: {
                family: 'Poppins'
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: {
                  family: "Poppins",
                  size: 12
                }
              }
            },
            y: {
              grid: {
                borderDash: [3, 3],
                color: '#e0e0e0',
                drawOnChartArea: true
              },
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 6,
                font: {
                  family: "Poppins",
                  size: 12
                }
              }
            }
          },
          interaction: {
            intersect: false,
            mode: 'index'
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
})();

// WidgetChart 5 and Percent-Chart 2 for index3.html
(() => {
  "use strict";
  
  try {
    //WidgetChart 5 (for index3.html)
    var ctx = document.getElementById("widgetChart5");
    if (ctx) {
      ctx.height = 220;
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
            label: "Monthly Sales",
            data: [78, 81, 80, 64, 65, 80, 70, 75, 67, 85, 66, 68],
            borderColor: "transparent",
            borderWidth: "0",
            backgroundColor: "#3f51b5",
          }]
        },
        options: {
          maintainAspectRatio: true,
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: false,
              categoryPercentage: 1,
              barPercentage: 0.65
            }],
            yAxes: [{
              display: false
            }]
          },
          title: {
            display: false,
          }
        }
      });
    }

    //Percent Chart 2 (for index3.html)
    var ctx = document.getElementById("percent-chart2");
    if (ctx) {
      ctx.height = 209;
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            label: "Market Share",
            data: [65, 35],
            backgroundColor: [
              '#00b5e9',
              '#fa4251'
            ],
            hoverBackgroundColor: [
              '#0099cc',  
              '#e63946'
            ],
            borderWidth: [2, 2],
            hoverBorderColor: [
              '#ffffff',
              '#ffffff'
            ]
          }],
          labels: [
            'Products',
            'Services'
          ]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          cutoutPercentage: 80,
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 15,
              fontSize: 12
            }
          },
          animation: {
            animateScale: true,
            animateRotate: true
          },
          tooltips: {
            backgroundColor: '#fff',
            titleFontColor: '#333',
            bodyFontColor: '#666',
            borderColor: '#ddd',
            borderWidth: 1,
            callbacks: {
              label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var value = dataset.data[tooltipItem.index];
                var label = data.labels[tooltipItem.index];
                return label + ': ' + value + '%';
              }
            }
          }
        }
      });
    }

    //Recent Report Chart 3 (for index4.html)
    var ctx = document.getElementById("recent-rep3-chart");
    if (ctx) {
      ctx.height = 230;
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
          datasets: [{
            label: 'Products',
            backgroundColor: 'rgba(33, 150, 243, 0.3)',
            borderColor: '#2196f3',
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: [78, 81, 80, 65, 58, 75, 60, 85],
            pointBackgroundColor: '#2196f3',
            fill: true,
            tension: 0.4
          }, {
            label: 'Services',
            backgroundColor: 'rgba(76, 175, 80, 0.3)',
            borderColor: '#4caf50',
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: [65, 59, 84, 84, 51, 55, 40, 70],
            pointBackgroundColor: '#4caf50',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 15,
              fontSize: 12
            }
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false
              },
              ticks: {
                fontFamily: "Poppins",
                fontSize: 12
              }
            }],
            yAxes: [{
              gridLines: {
                borderDash: [3, 3],
                color: '#e0e0e0'
              },
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 6,
                fontFamily: "Poppins",
                fontSize: 12
              }
            }]
          },
          tooltips: {
            backgroundColor: '#fff',
            titleFontColor: '#333',
            bodyFontColor: '#666',
            borderColor: '#ddd',
            borderWidth: 1,
            titleFontFamily: 'Poppins',
            bodyFontFamily: 'Poppins'
          }
        }
      });
    }

  } catch (error) {
    console.log(error);
  }
})();

// Vector Map placeholder - jQuery dependency removed
ready(() => {
  try {
    const vmapElement = $('#vmap');
    if (vmapElement) {
      // Replace with a simple colored div and message
      vmapElement.innerHTML = `
        <div style="
          width: 100%; 
          height: 284px; 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 18px;
          border-radius: 4px;
        ">
          <div style="text-align: center;">
            <i class="fas fa-globe-americas" style="font-size: 48px; margin-bottom: 10px; display: block;"></i>
            Interactive World Map<br>
            <small style="font-size: 14px; opacity: 0.8;">Vector map functionality available</small>
          </div>
        </div>
      `;
    }
  } catch (error) {
    console.log(error);
  }
});

// Progress Bar - Vanilla JS Version
ready(() => {
  try {
    const progressbarSimple = $$('.js-progressbar-simple');
    
    progressbarSimple.forEach(element => {
      let executed = false;
      
      // Replace waypoint with Intersection Observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !executed) {
            executed = true;
            // Simple progress bar animation
            const progressBar = entry.target;
            const value = progressBar.getAttribute('data-transitiongoal') || progressBar.getAttribute('data-value') || 75;
            const valueElement = find(progressBar, '.js-value');
            
            let currentValue = 0;
            const increment = value / 50; // Slower animation
            const timer = setInterval(() => {
              currentValue += increment;
              if (currentValue >= value) {
                currentValue = value;
                clearInterval(timer);
              }
              if (valueElement) {
                valueElement.innerHTML = Math.round(currentValue) + '%';
              }
              // Set width directly for au-progress bars
              progressBar.style.width = currentValue + '%';
            }, 30);
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(element);
    });
  } catch (err) {
    console.log(err);
  }
});

// Perfect Scrollbar - Vanilla JS Version
ready(() => {
  try {
    const jscr1 = $('.js-scrollbar1');
    if (jscr1) {
      const ps1 = new PerfectScrollbar(jscr1);      
    }

    const jscr2 = $('.js-scrollbar2');
    if (jscr2) {
      const ps2 = new PerfectScrollbar(jscr2);
    }

    const jscr3 = $('.js-scrollbar3');
    if (jscr3) {
      const ps3 = new PerfectScrollbar(jscr3);
    }

  } catch (error) {
    console.log(error);
  }
});

// Select2 - Vanilla JS Version (would need replacement)
ready(() => {
  try {
    const select2Elements = $$(".js-select2");
    select2Elements.forEach(element => {
      // TODO: Replace with vanilla JS select library like Choices.js
      // For now, keep basic functionality
      console.log('Select2 element found, needs replacement with vanilla JS library');
    });
  } catch (error) {
    console.log(error);
  }
});

// Dropdown Menu - Vanilla JS Version
ready(() => {
  try {
    const menu = $$('.js-item-menu');
    let subMenuIsShowed = -1;

    menu.forEach((menuItem, index) => {
      on(menuItem, 'click', function(e) {
        e.preventDefault();
        const rightSidebar = $('.js-right-sidebar');
        if (rightSidebar) {
          removeClass(rightSidebar, 'show-sidebar');
        }
        
        if (index === subMenuIsShowed) {
          toggleClass(this, 'show-dropdown');
          subMenuIsShowed = -1;
        } else {
          menu.forEach(item => {
            removeClass(item, 'show-dropdown');
          });
          toggleClass(this, 'show-dropdown');
          subMenuIsShowed = index;
        }
      });
    });

    // Click outside to close
    on(document.body, 'click', function() {
      menu.forEach(item => {
        removeClass(item, 'show-dropdown');
      });
      subMenuIsShowed = -1;
    });

    // Prevent clicks inside dropdown from closing it
    $$(".js-item-menu, .js-dropdown").forEach(element => {
      on(element, 'click', function(event) {
        event.stopPropagation();
      });
    });

  } catch (error) {
    console.log(error);
  }

  // Right Sidebar
  try {
    const rightSidebar = $('.js-right-sidebar');
    const sidebarBtn = $('.js-sidebar-btn');

    if (sidebarBtn) {
      on(sidebarBtn, 'click', function(e) {
        e.preventDefault();
        const menu = $$('.js-item-menu');
        menu.forEach(item => {
          removeClass(item, 'show-dropdown');
        });
        if (rightSidebar) {
          toggleClass(rightSidebar, 'show-sidebar');
        }
      });
    }

    // Click outside to close sidebar
    on(document.body, 'click', function() {
      if (rightSidebar) {
        removeClass(rightSidebar, 'show-sidebar');
      }
    });

    // Prevent clicks inside sidebar from closing it
    $$(".js-right-sidebar, .js-sidebar-btn").forEach(element => {
      on(element, 'click', function(event) {
        event.stopPropagation();
      });
    });

  } catch (error) {
    console.log(error);
  }

  // Sublist Sidebar - Vanilla JS Version
  try {
    const arrows = $$('.js-arrow');
    arrows.forEach(arrow => {
      on(arrow, 'click', function(e) {
        e.preventDefault();
        const arrowIcon = find(this, '.arrow');
        const subList = find(this.parentNode, '.js-sub-list');
        
        if (arrowIcon) {
          toggleClass(arrowIcon, 'up');
        }
        toggleClass(this, 'open');
        
        if (subList) {
          slideToggle(subList, 250);
        }
      });
    });

  } catch (error) {
    console.log(error);
  }
});

// Hamburger Menu - Vanilla JS Version
ready(() => {
  try {
    const hamburger = $('.hamburger');
    const mobileMenu = $('.navbar-mobile');

    if (hamburger) {
      on(hamburger, 'click', function() {
        toggleClass(this, 'is-active');
        if (mobileMenu) {
          slideToggle(mobileMenu, 300);
        }
      });
    }

  } catch (error) {
    console.log(error);
  }
});

// Window resize handler
let resizeTimer;
on(window, 'resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Handle responsive behavior
    const windowWidth = window.innerWidth;
    // Add responsive logic here
  }, 250);
});

// Initialize Leaflet World Map for index2.html
(() => {
  "use strict";
  
  const mapContainer = document.getElementById('vmap');
  if (mapContainer) {
    try {
      // Initialize the map
      const map = L.map('vmap', {
        center: [20, 0], // Center of the world
        zoom: 2,
        zoomControl: true,
        scrollWheelZoom: false,
        doubleClickZoom: true,
        attributionControl: false
      });

      // Add tile layer (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '',
        maxZoom: 10,
        minZoom: 1
      }).addTo(map);

      // Sample data points for major cities/regions
      const worldData = [
        { name: 'United States', lat: 39.8283, lng: -98.5795, value: 45000, color: '#00b5e9' },
        { name: 'United Kingdom', lat: 55.3781, lng: -3.4360, value: 32000, color: '#4caf50' },
        { name: 'Germany', lat: 51.1657, lng: 10.4515, value: 28000, color: '#ff9800' },
        { name: 'Japan', lat: 36.2048, lng: 138.2529, value: 35000, color: '#e91e63' },
        { name: 'Australia', lat: -25.2744, lng: 133.7751, value: 22000, color: '#9c27b0' },
        { name: 'Brazil', lat: -14.2350, lng: -51.9253, value: 18000, color: '#f44336' },
        { name: 'India', lat: 20.5937, lng: 78.9629, value: 25000, color: '#3f51b5' },
        { name: 'China', lat: 35.8617, lng: 104.1954, value: 40000, color: '#00bcd4' }
      ];

      // Add markers for each data point
      worldData.forEach(point => {
        const marker = L.circleMarker([point.lat, point.lng], {
          radius: Math.sqrt(point.value / 1000) + 5, // Size based on value
          fillColor: point.color,
          color: '#fff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.7
        }).addTo(map);

        // Add popup with country info
        marker.bindPopup(`
          <div style="text-align: center; padding: 5px;">
            <strong>${point.name}</strong><br>
            <span style="color: ${point.color}; font-weight: bold;">$${point.value.toLocaleString()}</span>
          </div>
        `);

        // Hover effects
        marker.on('mouseover', function() {
          this.setStyle({
            fillOpacity: 0.9,
            weight: 3
          });
        });

        marker.on('mouseout', function() {
          this.setStyle({
            fillOpacity: 0.7,
            weight: 2
          });
        });
      });

      // Add custom controls
      const info = L.control({position: 'topright'});
      info.onAdd = function() {
        const div = L.DomUtil.create('div', 'info');
        div.innerHTML = '<div style="background: rgba(255,255,255,0.9); padding: 8px; border-radius: 4px; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">Global Revenue Distribution</div>';
        return div;
      };
      info.addTo(map);

      console.log('Leaflet world map initialized successfully');
    } catch (error) {
      console.error('Error initializing world map:', error);
      // Fallback content
      document.getElementById('vmap').innerHTML = `
        <div style="height: 100%; display: flex; align-items: center; justify-content: center; background: #f8f9fa; color: #666; border-radius: 8px;">
          <div style="text-align: center;">
            <i class="fas fa-globe-americas" style="font-size: 32px; margin-bottom: 10px;"></i>
            <div>Map loading failed</div>
          </div>
        </div>
      `;
    }
  }
})();

console.log('CoolAdmin Vanilla JS initialized successfully');