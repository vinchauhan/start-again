import { Injectable } from '@angular/core';
import * as d3 from 'd3';
@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor() { }

  renderAlert(oType, oMessage) {
    d3.select('#svg_' + oType).remove();
    d3.select('#wait_' + oType).remove();
    const container = d3.select('#cnt_' + oType);
    const scene = container.append('svg').attr('id', 'svg_' + oType);
    // @ts-ignore
    const box = container.node().getBoundingClientRect();

    scene.attr('width', box.width - 10)
      .attr('height', 60);
    const gAlert = scene.append('g')
      .attr('transform', 'translate(10,10)');
    gAlert.append('rect')
      .attr('width', box.width - 22)
      .attr('height', 40)
      .style('stroke', '#AB433F')
      .style('fill', '#F2DEDE')
      .style('stroke-width', 1);
    gAlert.append('text')
      .attr('x', 10)
      .attr('y', 25)
      .text(oMessage)
      .attr('font-family', 'sans-serif')
      .attr('font-size', '14px')
      .attr('fill', '#AB433F');
  }

  hideToolTip(oDiv) {
    oDiv.transition()
      .duration(400)
      .style('opacity', 0);
  }

  addToolTip(oClass, oType) {
    const oDiv = d3.select('body').append('div')
      .attr('class', oClass + oType)
      .style('position', 'absolute');

    oDiv.style('padding', '5px')
      .style('font', '12px Arial, Helvetica, sans-serif')
      .style('background-color', 'white')
      .style('border', '1px solid #bbbbbb')
      .style('border-radius', '4px')
      .style('color', 'black')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('top', '-100px')
      .style('left', '-200px')
      .style('height', 'auto')
      .style('width', 'auto');
    return oDiv;
  }
}
