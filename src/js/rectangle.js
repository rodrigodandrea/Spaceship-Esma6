export default class Rectangle {

    constructor (x, y, width, height) {
        this.x = (x == null) ? 0 : x;
        this.y = (y == null) ? 0 : y;
        this.width = (width == null) ? 0 : width;
        this.height = (height == null) ? this.width : height;
      }
      
    intersects (rect) {
        if (rect != null) {
          return (this.x < rect.x + rect.width &&
            this.x + this.width > rect.x &&
            this.y < rect.y + rect.height &&
            this.y + this.height > rect.y);
        }
      }
      
    fill (ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
      
    drawImageArea (ctx, img, sx, sy, sw, sh) {
        if (img.width) {
          ctx.drawImage(img, sx, sy, sw, sh, this.x, this.y, this.width, this.height);
        } else {
          ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
      }
}