import anime from 'animejs/lib/anime.es';
import {shuffle} from 'lodash';

function per(i, len) {
  return i / (len - 1);
}

window.addEventListener('load', () => {
  document.getElementById('container').style.visibility = 'visible';
  anime({
    targets: document.querySelectorAll('#profile img'),
    duration: 850,
    delay: 250,
    easing: 'easeOutExpo',
    opacity: [0, 1],
    rotateZ: [`${0.05}turn`, 0],
    scale: [0.5, 1],
  });
  anime({
    targets: document.querySelectorAll('#profile .cover'),
    duration: (_, i, len) => 500 - per(i, len) * 50,
    delay: (_, i, len) => per(i, len) * 50,
    easing: 'easeInOutQuart',
    translateX: ['-100%', '100%'],
  });
  anime({
    targets: document.querySelectorAll('#profile p>span'),
    duration: 350,
    delay: (_, i, len) => 50 + per(i, len) * 250,
    easing: 'easeInOutQuad',
    opacity: [0, 1],
    translateX: ['-50%', 0],
  });

  const $links = Array.from(document.querySelectorAll('#social .links > div'));
  const $borders = Array.from(
    document.querySelectorAll('#social .border > .fill'),
  );
  shuffle([...Object.keys($links)])
    .map(Number)
    .forEach((i, j, {length}) => {
      const $link = $links[i];
      const $linkCovers = Array.from($link.querySelectorAll('.cover'));
      const $linkIcon = $link.querySelector('img');

      const $border = $borders[i];
      anime
        .timeline()
        .add({
          targets: $border,
          duration: 350,
          delay: 150 + per(j, length) * 600,
          easing: 'easeOutQuart',
          scaleX: [0, 1],
          translateX: [
            {
              value: '-10%',
              easing: 'easeOutCubic',
            },
            {
              value: 0,
            },
          ],
          opacity: [
            {
              value: 0.25,
              easing: 'easeOutCubic',
            },
            {
              value: 1,
            },
          ],
        })
        .add(
          {
            targets: $linkCovers,
            duration: 250,
            easing: 'easeInCubic',
            scale: [0, 1],
          },
          `-=${250}`,
        )
        .add(
          {
            targets: $linkCovers[1],
            duration: 500,
            easing: 'easeOutQuad',
            scale: 1.75,
            opacity: [1, 0],
            borderWidth: 0,
          },
          `-=${250}`,
        )
        .add(
          {
            targets: $linkIcon,
            duration: 250,
            easing: 'easeOutCubic',
            scale: [0, 1],
          },
          `-=${350}`,
        );
    });
});
