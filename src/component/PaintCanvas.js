import React, { useEffect, useRef, useState } from 'react';
import dat from 'dat.gui';
import './canvas.css';
const PaintCanvas = () => {
  const canvasRef = useRef(null);
  const [control, setControl] = useState({
    isRandomColor: true,
    isRandomSize: false,
    clear: () => {},
  });
  const brushRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let centerX, centerY;
    let mouseX = 0,
      mouseY = 0;
    let isMouseDown = false;

    class Hair {
      constructor(x, y, inkAmount, color) {
        this.x = x || 0;
        this.y = y || 0;
        this.inkAmount = inkAmount;
        this.color = color;
        this._latestPos = { x: this.x, y: this.y };
      }

      render(ctx, offsetX, offsetY, offsetLength) {
        this._latestPos.x = this.x;
        this._latestPos.y = this.y;
        this.x += offsetX;
        this.y += offsetY;

        let per = offsetLength ? this.inkAmount / offsetLength : 0;
        if (per > 1) per = 1;
        else if (per < 0) per = 0;

        ctx.save();
        ctx.lineCap = ctx.lineJoin = 'round';
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.inkAmount * per;
        ctx.beginPath();
        ctx.moveTo(this._latestPos.x, this._latestPos.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.restore();
      }
    }

    class Drop {
      constructor(x, y, size, color, strokeId) {
        this.x = x || 0;
        this.y = y || 0;
        this.size = size;
        this.color = color;
        this.strokeId = strokeId;
        this.life = this.size * 1.5;
        this._latestPos = { x: this.x, y: this.y };
        this._xOffRatio = 0;
      }

      render(ctx) {
        if (Math.random() < 0.03) {
          this._xOffRatio += 0.06 * Math.random() - 0.03;
        } else if (Math.random() < 0.1) {
          this._xOffRatio *= 0.003;
        }

        this._latestPos.x = this.x;
        this._latestPos.y = this.y;
        this.x += this.life * this._xOffRatio;
        this.y += this.life * 0.5 * Math.random();
        this.life -= 0.05 - 0.01 * Math.random() + 0.01;

        ctx.save();
        ctx.lineCap = ctx.lineJoin = 'round';
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size + this.life * 0.3;
        ctx.beginPath();
        ctx.moveTo(this._latestPos.x, this._latestPos.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.restore();
      }
    }

    class Brush {
      constructor(x, y, color, size, inkAmount) {
        this.x = x || 0;
        this.y = y || 0;
        if (color !== undefined) this.color = color;
        if (size !== undefined) this.size = size;
        if (inkAmount !== undefined) this.inkAmount = inkAmount;

        this._drops = [];
        this._resetTip();
      }

      _SPLASHING_BRUSH_SPEED = 75;
      color = '#000';
      size = 35;
      inkAmount = 7;
      splashing = true;
      dripping = true;
      _latestPos = null;
      _strokeId = null;
      _drops = null;

      isStroke() {
        return Boolean(this._strokeId);
      }

      startStroke() {
        if (this.isStroke()) return;
        this._resetTip();
        this._strokeId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
          /[xy]/g,
          (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          }
        );
      }

      endStroke() {
        this._strokeId = this._latestPos = null;
      }

      render(ctx, x, y) {
        const isStroke = this.isStroke();
        let dx, dy;

        if (!this._latestPos) this._latestPos = {};
        this._latestPos.x = this.x;
        this._latestPos.y = this.y;
        this.x = x;
        this.y = y;

        if (this._drops.length) {
          const drops = this._drops;
          const sizeSq = this.size * this.size;

          for (let i = 0, len = drops.length; i < len; i++) {
            const drop = drops[i];
            dx = this.x - drop.x;
            dy = this.y - drop.y;

            if (
              (isStroke &&
                sizeSq > dx * dx + dy * dy &&
                this._strokeId !== drop.strokeId) ||
              drop.life <= 0
            ) {
              drops.splice(i, 1);
              len--;
              i--;
              continue;
            }

            drop.render(ctx);
          }
        }

        if (isStroke) {
          const tip = this._tip;
          const strokeId = this._strokeId;
          let dist;

          dx = this.x - this._latestPos.x;
          dy = this.y - this._latestPos.y;
          dist = Math.sqrt(dx * dx + dy * dy);

          if (this.splashing && dist > this._SPLASHING_BRUSH_SPEED) {
            const maxNum = ((dist - this._SPLASHING_BRUSH_SPEED) * 0.5) | 0;
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.beginPath();
            for (let i = 0, len = (maxNum * Math.random()) | 0; i < len; i++) {
              const r = (dist - 1) * Math.random() + 1;
              const a = Math.PI * 2 * Math.random();
              const sr = 5 * Math.random();
              const sx = this.x + r * Math.sin(a);
              const sy = this.y + r * Math.cos(a);
              ctx.moveTo(sx + sr, sy);
              ctx.arc(sx, sy, sr, 0, Math.PI * 2, false);
            }
            ctx.fill();
            ctx.restore();
          } else if (
            this.dripping &&
            dist < this.inkAmount * 2 &&
            Math.random() < 0.05
          ) {
            this._drops.push(
              new Drop(
                this.x,
                this.y,
                (this.size + this.inkAmount) *
                  0.5 *
                  ((0.25 - 0.1) * Math.random() + 0.1),
                this.color,
                this._strokeId
              )
            );
          }

          for (let i = 0, len = tip.length; i < len; i++) {
            tip[i].render(ctx, dx, dy, dist);
          }
        }
      }

      dispose() {
        this._tip.length = this._drops.length = 0;
      }

      _resetTip() {
        const tip = (this._tip = []);
        const rad = this.size * 0.5;
        let x0, y0, a0, x1, y1, a1, cv, sv;
        let i, len;

        a1 = Math.PI * 2 * Math.random();
        len = ((rad * rad * Math.PI) / this.inkAmount) | 0;
        if (len < 1) len = 1;

        for (i = 0; i < len; i++) {
          x0 = rad * Math.random();
          y0 = x0 * 0.5;
          a0 = Math.PI * 2 * Math.random();
          x1 = x0 * Math.sin(a0);
          y1 = y0 * Math.cos(a0);
          cv = Math.cos(a1);
          sv = Math.sin(a1);

          tip.push(
            new Hair(
              this.x + x1 * cv - y1 * sv,
              this.y + x1 * sv + y1 * cv,
              this.inkAmount,
              this.color
            )
          );
        }
      }
    }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      centerX = canvas.width * 0.5;
      centerY = canvas.height * 0.5;
      context.clearRect(0, 0, canvas.width, canvas.height);
      brushRef.current.dispose();
    }

    function mouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function mouseDown(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (control.isRandomColor) {
        brushRef.current.color = randomColor();
      }
      if (control.isRandomSize) {
        brushRef.current.size = random(51, 5) | 0;
      }
      brushRef.current.startStroke();
    }

    function mouseUp() {
      brushRef.current.endStroke();
    }

    function touchMove(e) {
      const t = e.touches[0];
      mouseX = t.clientX;
      mouseY = t.clientY;
    }

    function touchStart(e) {
      const t = e.touches[0];
      mouseX = t.clientX;
      mouseY = t.clientY;
      if (control.isRandomColor) {
        brushRef.current.color = randomColor();
      }
      if (control.isRandomSize) {
        brushRef.current.size = random(51, 5) | 0;
      }
      brushRef.current.startStroke();
    }

    function touchEnd() {
      brushRef.current.endStroke();
    }

    function randomColor() {
      const r = random(256) | 0,
        g = random(256) | 0,
        b = random(256) | 0;
      return `rgb(${r},${g},${b})`;
    }

    function random(max, min = 0) {
      return Math.random() * (max - min) + min;
    }

    window.addEventListener('resize', resize, false);
    resize();

    canvas.addEventListener('mousemove', mouseMove, false);
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseout', mouseUp, false);
    canvas.addEventListener('mouseup', mouseUp, false);

    canvas.addEventListener('touchmove', touchMove, false);
    canvas.addEventListener('touchstart', touchStart, false);
    canvas.addEventListener('touchcancel', touchEnd, false);
    canvas.addEventListener('touchend', touchEnd, false);

    const gui = new dat.GUI();
    gui
      .addColor(brushRef.current, 'color')
      .name('Color')
      .onChange(() => {
        setControl((prev) => ({ ...prev, isRandomColor: false }));
      });
    gui.add(brushRef.current, 'size', 5, 50).name('Size');
    gui.add(brushRef.current, 'inkAmount', 1, 30).name('Ink Amount');
    gui.add(brushRef.current, 'splashing').name('Splashing');
    gui.add(brushRef.current, 'dripping').name('Dripping');
    gui.add(control, 'isRandomColor').name('Random Color');
    gui.add(control, 'isRandomSize').name('Random Size');
    gui.add(control, 'clear').name('Clear');
    gui.close();

    brushRef.current = new Brush(centerX, centerY, randomColor());

    const loop = () => {
      brushRef.current.render(context, mouseX, mouseY);
      requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', mouseMove);
      canvas.removeEventListener('mousedown', mouseDown);
      canvas.removeEventListener('mouseout', mouseUp);
      canvas.removeEventListener('mouseup', mouseUp);
      canvas.removeEventListener('touchmove', touchMove);
      canvas.removeEventListener('touchstart', touchStart);
      canvas.removeEventListener('touchcancel', touchEnd);
      canvas.removeEventListener('touchend', touchEnd);
      brushRef.current.dispose();
    };
  }, [control]);

  return (
    <div>
      <div id='message'>Drag mouse to paint.</div>
      <canvas ref={canvasRef} id='c' />
    </div>
  );
};

export default PaintCanvas;
