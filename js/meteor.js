(function () {
    const container = document.querySelector('#star-container');
    let width = container.clientWidth, height = container.clientHeight;
    const appendStar = (x, y) => {
      const div = document.createElement('div');
      div.classList.add('star');
      const left = x || Math.random() * (width - 10),
      top = y || Math.random() * (height - 150) ;
      div.style.left = `${left}px`;
      div.style.top = `${top}px`;
      div.addEventListener('webkitAnimationEnd', div.remove);
      div.addEventListener('mozAnimationEnd', div.remove);
      div.addEventListener('animationend', div.remove);
      container.appendChild(div);
    };
    const timeout = () => {
      appendStar();
      setTimeout(timeout, Math.random() * 1500 + 800);
    };
    timeout();
  
    container.addEventListener('mouseup', evt => appendStar(evt.offsetX, evt.offsetY));
  
    window.onresize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
    };
  })();