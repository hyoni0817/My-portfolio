function initSlide() {
  // 현재 활성 슬라이드 추적
  let currentSlide = 0; // 0: home, 1: profile, 2: project

  // 모든 왼쪽 버튼(이전 슬라이드로 이동)에 이벤트 추가
  const leftButtons = document.querySelectorAll('.station--left');
  leftButtons.forEach(button => {
    button.addEventListener('click', () => {
      console.log('왼쪽 버튼 클릭됨! 현재 슬라이드:', currentSlide);

      if (currentSlide === 1) {
        // 프로필 -> 홈
        gsap.to('.home', {
          x: 0, // 홈을 원래 위치로
          duration: 1,
          ease: 'power2.inOut',
        });
        gsap.to('.profile', {
          x: '100vw', // 프로필을 오른쪽으로 이동
          duration: 1,
          ease: 'power2.inOut',
        });
        currentSlide = 0; // 홈으로 상태 변경
      }
    });
  });

  // 모든 오른쪽 버튼(다음 슬라이드로 이동)에 이벤트 추가
  const rightButtons = document.querySelectorAll('.station--right');

  rightButtons.forEach(button => {
    button.addEventListener('click', () => {
      console.log('오른쪽 버튼 클릭됨! 현재 슬라이드:', currentSlide);

      if (currentSlide === 0) {
        // 홈 → 프로필
        gsap.to('.home', {
          x: '-100vw',
          duration: 1,
          ease: 'power2.inOut',
        });
        gsap.to('.profile', {
          x: '-100vw',
          duration: 1,
          ease: 'power2.inOut',
        });
        currentSlide = 1;
      } else if (currentSlide === 1) {
        // 프로필 → 프로젝트
        gsap.to('.profile', {
          x: '-200vw',
          duration: 1,
          ease: 'power2.inOut',
        });
        gsap.to('.project', {
          x: '-100vw',
          duration: 1,
          ease: 'power2.inOut',
        });
        currentSlide = 2;
      }
    });
  });
}
