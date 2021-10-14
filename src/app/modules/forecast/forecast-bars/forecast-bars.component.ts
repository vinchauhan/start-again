import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { tickFormat } from 'd3';
import * as _ from 'lodash';
import { CommonDataService } from 'src/app/shared/services/common-data.service';
import { environment } from 'src/environments/environment';
import {BehaviorSubject} from 'rxjs';
import {ForecastResponse} from '../models/forecast-response';

@Component({
  selector: 'app-forecast-bars',
  templateUrl: './forecast-bars.component.html',
  styleUrls: ['./forecast-bars.component.scss']
})
export class ForecastBarsComponent implements OnInit {

  @Input() forecastDemandData$: BehaviorSubject<ForecastResponse[]>;
  @Input() oType;
  daysOfWeek = _.cloneDeep(this.commonDataService.daysOfWeek);
	dayObject = _.cloneDeep(this.commonDataService.dayObject);
  showStatus = environment.showStatus;
  scope = 'day';
  selectedCompare = 'customYearsAgo';
  helios = {
    /**
	 * Colors for the Graphs
	 */
	  defTotalStart: '#00467F',
	  defTotalEnd: '#0078D2',
	  selTotalStart: '#9A1C1E',
	  selTotalEnd: '#9A1C1E',
	  defRemainStart: '#0078D2',
	  defRemainEnd: '#4DB4FA',
	  selRemainStart: '#E28D91',
	  selRemainEnd:  '#DBC9CE',
	  defCompareStart: '#9DA6AB',
	  defCompareEnd:   '#CCCCCC',
	  selCompareStart: '#646464',
	  selCompareEnd:   '#B1B1B1',
	  defPure: '#C30019',
	  selPure: '#CCCCCC',
  };
  constructor(private commonDataService: CommonDataService) { }

  ngOnInit(): void {
    // this.renderGraph(this.forecastDemandData);
    this.forecastDemandData$.subscribe((data) => {
      this.renderBars(data);
    });
  }

  renderBars(jsonData: ForecastResponse[]) {
    const margin = {
      top: 10,
      right: 10,
      bottom: 20,
      left: 25
    };
    // Remove existing svg when re-rendering
    d3.select('svg').remove();
    const container = d3.select('#cnt_forecast_bars');
    // @ts-ignore
    const box = container.node().getBoundingClientRect();
    // Do not render the Graph if the width or height is lesser than 50 pixels
    if (box.width < 50 || box.height < 50) {
      return;
    }
    let width = +box.width - margin.left - margin.right;
    let height = +box.height - margin.top - margin.bottom;
    // let height = 200;
    // let width = 1200;

    let eachRectWidth;
    // let width, height : number;
    if (this.oType === 'demand' && jsonData.length > 31) {
      eachRectWidth = width / 30 - 1;
      width = eachRectWidth * jsonData.length + 10;
      height = height - 30;
    }

    // create an svg under the container to draw the bars
    const svg = container.append('svg')
                         .attr('id', 'forecast_bars_svg')
                         .attr('height', height)
                         .attr('width', width);

    // Define the scale for x and y values after attaching the svg
    // const x_domain = d3.range(jsonData.length).map((d) => d+'');
    const xDomain: number[] = d3.range(jsonData.length);
    const x = d3.scaleBand<number>()
                .domain(xDomain)
                .range([margin.left, width - margin.right])
                .padding(0.1);
    const max = d3.max(jsonData, (d) => +d.demand );
    const y = d3.scaleLinear()
      // TODO: Get max domain from the max value of jsonData[].demand
                .domain([0, max + 10])
                .range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal()
      .range(['#D73027', '#FFFFBF' , '#1A9850']);

    // Create the bars
    svg.append('g')
       .attr('fill', '#005AA0')
       .selectAll('rect')
       .data(jsonData)
       .join('rect')
       .attr('x', (d, i) => x(i))
       .attr('y', (d) => y(d.demand))
       .attr('height', (d) => y(0) - y(d.demand))
       .attr('width', width / jsonData.length - 10);

    function xAxis(g) {
        g.attr('transform', `translate(0, ${height - margin.bottom})`);
        g.call(d3.axisBottom(x).tickFormat(i => jsonData[i].data.substr(5).replace('-', '/')));
        g.attr('font-size', '10px');
    }

    function yAxis(g) {
      g.attr('transform', `translate(${margin.left}, 0)`);
      // @ts-ignore
      g.call(d3.axisLeft(y).ticks(null, jsonData.format));
      g.attr('font-size', '10px');
    }
    svg.append('g').call(yAxis);
    svg.append('g').call(xAxis);
    svg.node();
  }

  renderGraph(jsonData) {
    console.log('renderGraph', jsonData);
    const oType = this.oType;
    d3.select('#wait_' + oType).remove();
    d3.select('#svg_' + oType).remove();
    d3.select('.tip_' + oType).remove();
    const container = d3.select('#cnt_' + oType);
    // let container = d3.select('#fcst_bars_container');
    const scene = container.append('svg').attr('id', 'svg_' + oType);
    const margin = {
      top: 10,
      right: 10,
      bottom: 20,
      left: 40
    };
    // @ts-ignore
    const box = container.node().getBoundingClientRect();
    if (box.width < 50 || box.height < 50) {
      return;
    }
    let width = +box.width - margin.left - margin.right;
    let height = +box.height - margin.top - margin.bottom;
    let eachRectWidth;
    if (this.oType === 'demand' && jsonData.length > 31) {
      eachRectWidth = width / 30 - 1;
      width = eachRectWidth * jsonData.length + 10;
      height = height - 30;
    }

    // More logic for only 'demand' but not > 31

    // Determine the Comparison factor
			 let oCompare = '';
    const selectedCompare = this.selectedCompare;
			// @ts-ignore
			 if (selectedCompare === 'lastNight') {
				oCompare = 'lastNight';
			} else {
				// @ts-ignore
				if (selectedCompare === 'lastWeek') {
					oCompare = 'lastWeek';
					// @ts-ignore
				} else if (selectedCompare === 'lastMonth') {
					oCompare = 'lastMonth';
					// @ts-ignore
				} else if (selectedCompare === 'lastYear') {
					oCompare = 'lastYear';
					// @ts-ignore
				} else if (selectedCompare === 'twoYearsAgo') {
					oCompare = 'lastYear';
					// @ts-ignore
				} else if (selectedCompare === 'custom') {
					oCompare = 'custom';
				} else if (selectedCompare === 'customYearsAgo') {
					oCompare = 'custom';
				} else {
					oCompare = 'pure';
				}
			}


    const defPure = '#C30019';
    const selPure = '#CCCCCC';
    const defs = scene.append('defs');
    const defTotalGrad = defs.append('linearGradient')
                         .attr('id', this.oType + '_defTotalGrad')
                         .attr('x1', '0%')
                         .attr('x2', '0%')
                         .attr('y1', '0%')
                         .attr('y2', '100%');
    defTotalGrad.append('stop')
                         .attr('class', 'start')
                         .attr('offset', '0%')
                         .attr('stop-color', this.helios.defTotalStart)
                         .attr('stop-opacity', 1);
    defTotalGrad.append('stop')
                         .attr('class', 'stop')
                         .attr('offset', '100%')
                         .attr('stop-color', this.helios.defTotalEnd)
                         .attr('stop-opacity', 1);
    const selTotalGrad = defs.append('linearGradient')
      .attr('id', this.oType + '_selTotalGrad')
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '0%')
      .attr('y2', '100%');

    selTotalGrad.append('stop')
                        .attr('class', 'start')
                        .attr('offset', '0%')
                        .attr('stop-color', this.helios.selTotalStart)
                        .attr('stop-opacity', 1);
    selTotalGrad.append('stop')
    .attr('class', 'stop')
    .attr('offset', '100%')
    .attr('stop-color', this.helios.selTotalEnd)
    .attr('stop-opacity', 1);
    const defRemainGrad = defs.append('linearGradient')
    .attr('id', this.oType + '_defRemainGrad')
    .attr('x1', '0%')
    .attr('x2', '0%')
    .attr('y1', '0%')
    .attr('y2', '100%');
    defRemainGrad.append('stop')
    .attr('class', 'start')
    .attr('offset', '0%')
    .attr('stop-color', this.helios.defRemainStart)
    .attr('stop-opacity', 1);
    defRemainGrad.append('stop')
    .attr('class', 'stop')
    .attr('offset', '100%')
    .attr('stop-color', this.helios.defRemainEnd)
    .attr('stop-opacity', 1);
    const selRemainGrad = defs.append('linearGradient')
    .attr('id', this.oType + '_selRemainGrad')
    .attr('x1', '0%')
    .attr('x2', '0%')
    .attr('y1', '0%')
    .attr('y2', '100%');
    selRemainGrad.append('stop')
    .attr('class', 'start')
    .attr('offset', '0%')
    .attr('stop-color', this.helios.selRemainStart)
    .attr('stop-opacity', 1);
    selRemainGrad.append('stop')
    .attr('class', 'stop')
    .attr('offset', '100%')
    .attr('stop-color', this.helios.selRemainEnd)
    .attr('stop-opacity', 1);
    const defCompareGrad = defs.append('linearGradient')
    .attr('id', this.oType + '_defCompareGrad')
    .attr('x1', '0%')
    .attr('x2', '0%')
    .attr('y1', '0%')
    .attr('y2', '100%');
    defCompareGrad.append('stop')
    .attr('class', 'start')
    .attr('offset', '0%')
    .attr('stop-color', this.helios.defCompareStart)
    .attr('stop-opacity', 1);
    defCompareGrad.append('stop')
    .attr('class', 'stop')
    .attr('offset', '100%')
    .attr('stop-color', this.helios.defCompareEnd)
    .attr('stop-opacity', 1);
    const selCompareGrad = defs.append('linearGradient')
    .attr('id', this.oType + '_selCompareGrad')
    .attr('x1', '0%')
    .attr('x2', '0%')
    .attr('y1', '0%')
    .attr('y2', '100%');
    selCompareGrad.append('stop')
    .attr('class', 'start')
    .attr('offset', '0%')
    .attr('stop-color', this.helios.selCompareStart)
    .attr('stop-opacity', 1);
    selCompareGrad.append('stop')
    .attr('class', 'stop')
    .attr('offset', '100%')
    .attr('stop-color', this.helios.selCompareEnd)
    .attr('stop-opacity', 1);


    const xScale = d3.scaleBand()
    .rangeRound([0, width]).padding(0.1);
  // xScale2
    d3.scaleBand()
    .rangeRound([0, width]).padding(0.1);
  // xScale3
    d3.scaleBand()
    .rangeRound([0, width]).padding(0.1);
    const yScale = d3.scaleLinear()
    .rangeRound([height, 0]);
    const xAxis = d3.axisBottom(xScale);
    let xAxis2, xAxis3;

    const yAxis = d3.axisLeft(yScale);
    const gArea = scene.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    if (this.showStatus) {
      let totalFlightCounts = 0;
      let totalInfluenceCounts = 0;
      jsonData.forEach(data => {
        if (this.oType === 'demand' || this.oType === 'times' || this.oType === 'days') {
          totalFlightCounts += data.flightCounts;
        } else {
          const maxFlightCount = _.maxBy(jsonData, 'flightCounts');
          console.log(maxFlightCount);
          // @ts-ignore
          totalFlightCounts = maxFlightCount.flightCounts;
        }
        totalInfluenceCounts += data.influenceCounts;
      });
      scene.append('text')
        .attr('x', (margin.left + 15))
        .attr('y', (margin.top + 15))
        .style('font-size', '12px')
        .style('fill', this.helios.defPure)
        .text(`Status: Queried ${this.numberWithCommas(totalFlightCounts)} flights
          and ${this.numberWithCommas(totalInfluenceCounts)} influences for this Graph`);
    }
    if (this.oType === 'demand') {
      xScale.domain(jsonData.map((d) => {
        return formatDate(d.data, 'MM/dd', 'en-US');
      }));
    } else {
      xScale.domain(jsonData.map((d) => {
        // @ts-ignore
        return d.barLabel;
      }));
    }
    yScale.domain([0, d3.max(jsonData, (d) => {
      // @ts-ignore
      return (_.max([d.demand, d[oCompare].demand, d.pure, d.remaining]) * 1.2);
    })]);

    // Add the Tool Tip Box
    // const toolTip = this.graphService.addToolTip('tip_', oType);


    // Drawing the X-Axis with Days...
			 if (oType !== 'forecast') {
				// gDays
				gArea.append('g')
					.attr('class', 'axis x-axis')
					.attr('transform', 'translate(0,' + height + ')')
					.call(xAxis);
			}
			 if (oType === 'demand') {
				if (this.scope === 'day') {
					xAxis2 = d3.axisBottom(xScale).tickFormat((d, i) => {
						if (jsonData[i].dow === jsonData[i][oCompare].dow) {
							return this.dayObject[jsonData[i].dow];
						}
						return this.dayObject[jsonData[i].dow] + '|' + this.dayObject[jsonData[i][oCompare].dow];

					});
					xAxis3 = d3.axisBottom(xScale).tickFormat((d, i) => {
						return jsonData[i].pool + '|' + jsonData[i][oCompare].pool;
					});
					// gDays
					gArea.append('g')
						.attr('class', 'axis x-axis')
						.attr('transform', 'translate(0,' + height + ')')
						.call(xAxis);

					gArea.append('g')
						.attr('class', 'axis2 x-axis')
						.attr('transform', 'translate(0,' + (height + 15) + ')')
						.call(xAxis2);

					gArea.append('g')
						.attr('class', 'axis2 x-axis')
						.attr('transform', 'translate(0,' + (height + 30) + ')')
						.call(xAxis3);
				}

				if (this.scope === 'week') {
					const xAxis1 = d3.axisBottom(xScale).tickFormat((d, i) => {
						const month = formatDate(jsonData[i].data, 'MM', 'en-US');
						const week = jsonData[i].barLabel.split(' ');
						return month + '/' + week[1];

					});
					xAxis2 = d3.axisBottom(xScale).tickFormat((d, i) => {
						return formatDate(jsonData[i].data, 'yyyy', 'en-US');
					});
					gArea.append('g')
						.attr('class', 'axis x-axis')
						.attr('transform', 'translate(0,' + height + ')')
						.call(xAxis1);
					gArea.append('g')
						.attr('class', 'axis2 x-axis')
						.attr('transform', 'translate(0,' + (height + 15) + ')')
						.call(xAxis2);
				}

				if (this.scope === 'month') {
					const xAxis1 = d3.axisBottom(xScale).tickFormat((d, i) => {
						return formatDate(jsonData[i].data, 'MM', 'en-US');
					});
					xAxis2 = d3.axisBottom(xScale).tickFormat((d, i) => {
						return formatDate(jsonData[i].data, 'yyyy', 'en-US');
					});
					gArea.append('g')
						.attr('class', 'axis x-axis')
						.attr('transform', 'translate(0,' + height + ')')
						.call(xAxis1);
					gArea.append('g')
						.attr('class', 'axis2 x-axis')
						.attr('transform', 'translate(0,' + (height + 15) + ')')
						.call(xAxis2);
				}
				// Set scroll bar X position here after graph has fully rendered
				// @ts-ignore
				// container._groups[0][0].scrollLeft = scrollBarXPos;


        // Drawing the Y-Axis with Values...
			// gValues
			 gArea.append('g')
      .attr('class', 'axis y-axis')
      .call(yAxis)
      .append('text')
      .attr('fill', '#000000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 12)
      .style('text-anchor', 'end');

    // Adding styles to the Axises...
    d3.selectAll('.axis').style('font', '10px sans-serif');
    d3.selectAll('.axis path')
      .style('fill', 'none')
      .style('stroke', '#000000')
      .style('shape-rendering', 'crispEdges');
    d3.selectAll('.axis line')
      .style('fill', 'none')
      .style('stroke', '#000000')
      .style('shape-rendering', 'crispEdges');

    d3.selectAll('.axis2').style('font', '10px sans-serif');
    d3.selectAll('.axis2 path')
      .style('fill', 'none')
      .style('stroke', 'none')
      .style('shape-rendering', 'crispEdges');
    d3.selectAll('.axis2 line')
      .style('fill', 'none')
      .style('stroke', 'none')
      .style('shape-rendering', 'crispEdges');
			}


    // Drawing the Bars...
			 const gBars = gArea.selectAll('.bars')
      .data(jsonData)
      .enter()
      .append('g');


      // Drawing the Comparison Demand...
			 let rectWidth = xScale.bandwidth();

			 const noBarsSelected = _.every(jsonData, ['selected', false]);
			 if (oType === 'demand' && jsonData.length > 31) {
				rectWidth = eachRectWidth - 5;
			}
			 const brush = d3.brushX();
			 gBars.call(brush);

			 let click = false;
			 brush.on('end', () => {
				if (click) { // if true then double click
					console.log('double click');
					// this.onDoubleClickBrush(oType);
					click = false;
				} else {
					// timeout to reset the flag after 500 milliseconds of 1st mouse down.
					setTimeout(() => {
						click = false;
					}, 500);
				}
				click = !click;

        // @ts-ignore
				// if (!d3.event.selection) return;
        // @ts-ignore
				// const k = d3.event.selection;
				const selectedArea = jsonData.filter((data) => {
					let x0;
					if (oType === 'forecast') {
						x0 = xScale(formatDate(data.data, 'MM/dd', 'en-US'));
					} else {
						x0 = xScale(data.barLabel);
					}
					const x1 = x0 + rectWidth;

					// return k[0] <= x0 && k[1] >= x1;
				});

				// this.onSelectBrush(oType, selectedArea);
			});

			 gBars.append('rect')
				.style('fill', (d) => {
					// @ts-ignore
					return d.selected ? 'url(#' + oType + '_selCompareGrad)' : 'url(#' + oType + '_defCompareGrad)';
				})
				.attr('x', (d) => {
					// @ts-ignore
					if (oType === 'forecast') {
            // @ts-ignore
						return xScale(formatDate(d.data, 'MM/dd', 'en-US'));
					}
					// return xScale(d.barLabel);
				})
				.attr('width', rectWidth)
				.attr('y', (d) => {
					return yScale(d[oCompare].demand);
				})
				.attr('height', (d) => {
					return height - yScale(d[oCompare].demand);
				})
				.attr('class', (d) => {
					// @ts-ignore
					return 'bar_' + oType + ' cmp_' + d.data;
				})
				.on('mouseover', (data) => {
					// this.showToolTip(toolTip, data, selectedCompare, oCompare, oType);
				})
				.on('mouseout', () => {
					// this.graphService.hideToolTip(toolTip);
				});





  }

  numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}



}
