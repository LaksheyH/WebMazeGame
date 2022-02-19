//class to create the maze and all the nodes associated with the maze
export default class MazeCreater {
  //Creates maze given a 2d array of 0,1 (TODO get from java server API)
  //@params scene the canvas in which the maze is drawn onto
  //@params mazeData the data used to create the maze
  constructor(scene, mazeData, cw, ch) {
    this.scene = scene;
    this.mazeNodes = [];
    this.mazeData = mazeData
    this.cw = cw
    this.ch = ch
  }

  //fills the mazeNodes array with all the solid maze nodes
  //returns all maze nodes
  addAllMazeNodes() {
    const Scale = 60;
    const LeftMargin = Math.floor(this.cw / 4);
    var widthRatio = Math.min(this.cw, this.ch);
    var currentColumn = 0;
    this.scene.fillStyle = "#000000"
    var width = Math.ceil(widthRatio / Scale);
    var height = Math.ceil(widthRatio / Scale);
    this.mazeData.forEach(row => {
      currentColumn++;
      var currentRow = 0;
      row.forEach(node => {
        currentRow++;;
        var x = (width) * currentColumn + Math.ceil(widthRatio / (Scale / 4)) + LeftMargin;
        var y = (height) * currentRow + Math.ceil(widthRatio / (Scale / 4));

        if (node == 0) {
          this.mazeNodes.push([x, y, width, height])
        }
      })
    })
    return this.mazeNodes;
  }

  //Draws maze onto canvas
  //(TODO allow customization of colors as param)
  createMaze() {
    const Scale = 60;
    const LeftMargin = Math.floor(this.cw / 4);
    var widthRatio = Math.min(this.cw, this.ch);
    var currentColumn = 0;
    this.scene.fillStyle = "#000000"
    var width = Math.ceil(widthRatio / Scale);
    var height = Math.ceil(widthRatio / Scale);
    this.mazeData.forEach(row => {
      currentColumn++;
      var currentRow = 0;
      row.forEach(node => {
        currentRow++;;
        var x = (width) * currentColumn + Math.ceil(widthRatio / (Scale / 4)) + LeftMargin;
        var y = (height) * currentRow + Math.ceil(widthRatio / (Scale / 4));

        if (node == 0) {
          this.scene.fillRect(x, y, width, height)
        }
      })
    })
  }
}