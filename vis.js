
const data = [100, 200, 150, 300, 250];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]; // X-axis labels
const svg = document.getElementById("chart");

const chartHeight = parseInt(svg.getAttribute("height"));
const chartWidth = parseInt(svg.getAttribute("width"));

const barWidth = 50;
const gap = 40;
const xOffset = 60; // space for y-axis
const yOffset = 40; // space for x-axis

// Draw X-axis
const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
xAxis.setAttribute("x1", xOffset);
xAxis.setAttribute("y1", chartHeight - yOffset);
xAxis.setAttribute("x2", chartWidth - 20);
xAxis.setAttribute("y2", chartHeight - yOffset);
xAxis.setAttribute("stroke", "black");
svg.appendChild(xAxis);

// Draw Y-axis
const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
yAxis.setAttribute("x1", xOffset);
yAxis.setAttribute("y1", 20);
yAxis.setAttribute("x2", xOffset);
yAxis.setAttribute("y2", chartHeight - yOffset);
yAxis.setAttribute("stroke", "black");
svg.appendChild(yAxis);

/// Add Y-axis label 
const yLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
yLabel.textContent = "Minutes of Work";
yLabel.setAttribute("x", xOffset - 80); 
yLabel.setAttribute("y", chartHeight / 2);
yLabel.setAttribute("transform", `rotate(-90, ${xOffset - 30}, ${chartHeight / 2})`);
yLabel.setAttribute("font-size", "14");
svg.appendChild(yLabel);

// Create tooltip
const tooltip = document.createElementNS("http://www.w3.org/2000/svg", "text");
tooltip.setAttribute("fill", "black");
tooltip.setAttribute("font-size", "14");
tooltip.setAttribute("text-anchor", "middle");
tooltip.style.visibility = "hidden";
svg.appendChild(tooltip);

// Bars + X labels
data.forEach((value, i) => {
  const x = i * (barWidth + gap) + xOffset + 10;
  const y = chartHeight - yOffset - value;

  const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  bar.setAttribute("x", x);
  bar.setAttribute("y", y);
  bar.setAttribute("width", barWidth);
  bar.setAttribute("height", value);
  bar.setAttribute("fill", "steelblue");

  // Hover interactions
  bar.addEventListener("mouseover", () => {
    tooltip.textContent = value + " min";
    tooltip.setAttribute("x", x + barWidth / 2);
    tooltip.setAttribute("y", y - 10);
    tooltip.style.visibility = "visible";
    bar.setAttribute("fill", "violet");
  });

  bar.addEventListener("mouseout", () => {
    tooltip.style.visibility = "hidden";
    bar.setAttribute("fill", "steelblue");
  });

  svg.appendChild(bar);

  // Add X-axis labels (days)
  const dayLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
  dayLabel.textContent = days[i];
  dayLabel.setAttribute("x", x + barWidth / 2);
  dayLabel.setAttribute("y", chartHeight - yOffset + 20);
  dayLabel.setAttribute("text-anchor", "middle");
  dayLabel.setAttribute("font-size", "12");
  svg.appendChild(dayLabel);
});

// ---------------------------------------
// viusalization 2
// ---------------------------------------


window.addEventListener('DOMContentLoaded', () => {
  const thunder = document.getElementById('thunder'); 
  const path = thunder.querySelector('path');
  const para = document.getElementById('text');

  // get the actual length of the path
  const length = path.getTotalLength();

  // set stroke dash properties
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  // set CSS variable for animation
  document.documentElement.style.setProperty("--path-length", length);

  const clickunclickart = function() {
    if(thunder.classList.contains('click')) {
      thunder.classList.remove('click');
      para.textContent = ':(';
      // reset so it can play again
      path.style.strokeDashoffset = length;
    } else {
      thunder.classList.add('click');
      para.textContent = ':)';
    }
  };

  thunder.addEventListener('click', clickunclickart); 
  thunder.addEventListener('touchstart', clickunclickart); 
});
