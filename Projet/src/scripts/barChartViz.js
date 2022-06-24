/**
 * Appends SVG g elements which will contain the x and y axes.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
 export function appendAxes (g) {
    g.append('g')
      .attr('class', 'x axis')
  
    g.append('g')
      .attr('class', 'y axis')
  }
  
/**
 * Appends the labels for the the y axis and the title of the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
 export function appendGraphLabels (g) {
    g.append('text')
      .text('Total counts for the year')
      .attr('class', 'y axis-text')
      .attr('transform', 'rotate(-90)')
      .attr('fill', '#898989')
      .attr('font-size', 12)
  
    g.append('text')
      .text('Average counts per year')
      .attr('class', 'title')
      .attr('fill', '#898989')
  }

/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
 export function setCanvasSize (width, height) {
    d3.select('#bar-svg')
      .attr('width', width)
      .attr('height', height)
  }

/**
 * Positions the x axis label, y axis label and title label on the graph.
 *
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
 export function positionLabels (width, height) {
    d3.select('.y.axis-text')
      .attr('x', -50)
      .attr('y', height / 2)
  
    d3.select('.title')
      .attr('x', width / 2)
      .attr('y', -35)
  }

/**
 * Updates the X scale to be used within each group of the grouped bar chart
 *
 * @param {*} scale The scale used for the subgroups
 * @param {string[]} subGroupBars The bars per subgroup (average on all counters and specific counter)
 * @param {*} xScale The graph's encompassing x scale
 */
 export function updateXSubgroupScale (scale, subGroupBars, xScale) {
    scale
      .domain(subGroupBars)
      .range([0, xScale.bandwidth()])
  }

/**
 * Draws the x axis at the bottom of the plot.
 *
 * @param {*} xScale The scale to use for the x axis
 * @param {number} height The height of the graph
 */
export function drawXAxis (xScale, height) {
    d3.select('.x.axis')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(d3.axisBottom(xScale)
        .tickFormat(x => `year ${x}`))
  }

/**
 * Draws the y axis at the left of the plot.
 *
 * @param {*} yScale The scale to use for the y axis
 */
export function drawYAxis (yScale) {
    d3.select('.y.axis').call(d3.axisLeft(yScale).ticks(5))
  }

/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
 export function updateGroupXScale (scale, data, width) {
    scale.domain(data.Average.year).range([0, width])
  }
  
  /**
   * Sets the domain and range of the Y scale.
   *
   * @param {*} scale The Y scale
   * @param {object[]} data The data to be used
   * @param {number} height The height of the graph
   */
  export function updateYScale (scale, data, height) {
    const max = d3.max(data.Average.counts, m => d3.max(m))
    scale.domain([0, max]).range([height, 0])
  }
  
  /**
   * Creates the groups for the grouped bar chart and appends them to the graph.
   * Each group corresponds to a pair of average/chosen counter values
   *
   * @param {object[]} data The data to be used
   * @param {*} x The graph's x scale
   */
  export function createGroups (data, x) {
    d3.select('#bar-svg')
      .selectAll('.group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'group')
      .attr('transform', data => 'translate(' + x(data.Average.year + ',0)'))
      .attr('x', (data) => x(data.Average.year))
  }
  /**
   * Draws the bars inside the groups
   *
   * @param {*} y The graph's y scale
   * @param {*} xSubgroup The x scale to use to position the rectangles in the groups
   * @param {number} height The height of the graph
   * @param {object[]} data The data to be used
   */
  export function drawBars (y, xSubgroup, height, data) {
    d3.select('#bar-svg')
      .selectAll('.group')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (data) => xSubgroup(data.Average.year))
      .attr('y', (data) => y(data.Average.counts))
      .attr('width', xSubgroup.bandwidth())
      .attr('height', (data) => height - y(data.Average.counts))
  }

const margin = { top: 80, right: 0, bottom: 80, left: 55 }

let bounds
let svgSize
let graphSize

const xScale = d3.scaleBand().padding(0.15)
const xSubgroupScale = d3.scaleBand().padding([0.015])
const yScale = d3.scaleLinear()

/**
     *   This function handles the graph's sizing.
     */
 function setSizing () {
    bounds = d3.select('#bar-svg').node().getBoundingClientRect()

    svgSize = {
      width: bounds.width,
      height: 550
    }

    graphSize = {
      width: svgSize.width - margin.right - margin.left,
      height: svgSize.height - margin.bottom - margin.top
    }

    setCanvasSize(svgSize.width, svgSize.height)
  }

/**
     *   This function builds the graph.
     */
 export function buildBarChart (data, g) {
    appendAxes(g)
    appendGraphLabels(g)
    setSizing()

    var subGroupBars = ['Average', 'X'] // Update according to data input

    positionLabels(graphSize.width, graphSize.height)

    updateGroupXScale(xScale, data, graphSize.width)
    updateXSubgroupScale(xSubgroupScale, subGroupBars, xScale)
    updateYScale(yScale, data, graphSize.height)

    drawXAxis(xScale, graphSize.height)
    drawYAxis(yScale)

    createGroups(data, xScale)
    drawBars(yScale, xSubgroupScale, subGroupBars, graphSize.height)
  }