/**
 * SVG 애니메이션 유틸리티 함수들
 */

// SVG Path 그리기 애니메이션 (drawSVG 대안)
function animateSpiralDraw(selector) {
  const spiralPath = document.querySelector(`${selector}`);

  if (spiralPath && window.SVGAnimations) {
    // SVG 애니메이션 유틸리티의 animatePathDraw 함수 사용
    SVGAnimations.animatePathDraw(`${selector}`, {
      duration: 2.5,
      ease: 'power2.inOut',
      delay: 0,
      strokeWidth: 0.634525, // 기존 stroke-width 유지
      strokeColor: '#ffffff',
    });
  } else {
    // 직접 구현한 선 그리기 애니메이션
    if (spiralPath) {
      const pathLength = spiralPath.getTotalLength();

      // 초기 설정: 선을 완전히 숨김
      gsap.set(spiralPath, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // 선이 그려지는 애니메이션
      gsap.to(spiralPath, {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: 'power2.inOut',
      });
    }
  }
}

// SVG 모프 애니메이션
function morphSVG(fromSelector, toPath, options = {}) {
  const {
    duration = 1,
    ease = 'power2.inOut',
    repeat = 0,
    yoyo = false,
  } = options;

  // 간단한 모프 애니메이션 (실제로는 MorphSVG 플러그인이 필요)
  // 여기서는 scale과 rotation으로 대체
  gsap.to(fromSelector, {
    scaleX: 1.2,
    scaleY: 0.8,
    rotation: 10,
    duration: duration / 2,
    ease: ease,
    yoyo: true,
    repeat: 1,
  });
}

// SVG 입자 효과
function createParticleEffect(containerSelector, options = {}) {
  const {
    particleCount = 20,
    colors = ['#ffffff', '#ffff00', '#ff69b4'],
    size = { min: 2, max: 6 },
    duration = { min: 2, max: 4 },
    spread = 100,
  } = options;

  const container = document.querySelector(containerSelector);
  if (!container) return;

  for (let i = 0; i < particleCount; i++) {
    // SVG 입자 생성
    const particle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    const particleSize = gsap.utils.random(size.min, size.max);
    const color = gsap.utils.random(colors);

    particle.setAttribute('r', particleSize);
    particle.setAttribute('fill', color);
    particle.setAttribute('cx', 0);
    particle.setAttribute('cy', 0);

    container.appendChild(particle);

    // 랜덤 애니메이션
    gsap.set(particle, {
      x: gsap.utils.random(-spread / 2, spread / 2),
      y: gsap.utils.random(-spread / 2, spread / 2),
      opacity: 0,
    });

    gsap.to(particle, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });

    gsap.to(particle, {
      x: `+=${gsap.utils.random(-spread, spread)}`,
      y: `+=${gsap.utils.random(-spread, spread)}`,
      opacity: 0,
      duration: gsap.utils.random(duration.min, duration.max),
      ease: 'power2.out',
      delay: gsap.utils.random(0, 1),
      onComplete: () => {
        particle.remove();
      },
    });
  }
}

// SVG 글리치 효과
function glitchEffect(selector, options = {}) {
  const { duration = 0.1, intensity = 5, repeat = 3 } = options;

  const tl = gsap.timeline({ repeat: repeat });

  tl.to(selector, {
    x: gsap.utils.random(-intensity, intensity),
    y: gsap.utils.random(-intensity, intensity),
    duration: duration,
    ease: 'power2.inOut',
  })
    .to(selector, {
      x: gsap.utils.random(-intensity, intensity),
      y: gsap.utils.random(-intensity, intensity),
      duration: duration,
      ease: 'power2.inOut',
    })
    .to(selector, {
      x: 0,
      y: 0,
      duration: duration,
      ease: 'power2.inOut',
    });

  return tl;
}

// SVG 펄스 효과
function pulseEffect(selector, options = {}) {
  const { scale = 1.2, duration = 1, repeat = -1, yoyo = true } = options;

  return gsap.to(selector, {
    scale: scale,
    duration: duration,
    repeat: repeat,
    yoyo: yoyo,
    ease: 'sine.inOut',
  });
}

// SVG 색상 변화 애니메이션
function colorShift(selector, colors = [], options = {}) {
  const { duration = 2, repeat = -1, ease = 'sine.inOut' } = options;

  if (colors.length < 2) return;

  const tl = gsap.timeline({ repeat: repeat });

  colors.forEach((color, index) => {
    if (index === 0) return; // 첫 번째 색상은 시작점

    tl.to(selector, {
      fill: color,
      duration: duration / colors.length,
      ease: ease,
    });
  });

  return tl;
}

// 내보내기
window.SVGAnimations = {
  animatePathDraw,
  morphSVG,
  createParticleEffect,
  glitchEffect,
  pulseEffect,
  colorShift,
};
