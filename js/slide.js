function resetProfileElements() {
  // 모든 프로필 관련 애니메이션 중지
  gsap.killTweensOf([
    '.profile__image__group',
    '.profile__party__image',
    '.profile__fill-sparkle__image',
    '.profile__spiral__image--left',
    '.profile__spiral__image--right',
  ]);

  // 요소들을 초기 상태로 리셋
  gsap.set(
    [
      '.profile__image__group',
      '.profile__party__image',
      '.profile__fill-sparkle__image',
      '.profile__spiral__image--left',
      '.profile__spiral__image--right',
    ],
    {
      visibility: 'hidden',
      opacity: 0,
      scale: 1,
      rotation: 0,
      x: 0,
      y: 0,
      clearProps: 'all', // 모든 인라인 스타일 제거
    }
  );

  // SVG path의 stroke 애니메이션도 리셋
  const spiralRightPath = document.querySelector(
    '.profile__spiral__image--right path'
  );
  if (spiralRightPath) {
    gsap.set(spiralRightPath, {
      strokeDasharray: 'none',
      strokeDashoffset: 0,
      clearProps: 'strokeDasharray,strokeDashoffset',
    });
  }

  // SVG path의 stroke 애니메이션도 리셋
  const spiralLeftPath = document.querySelector(
    '.profile__spiral__image--left path'
  );
  if (spiralLeftPath) {
    gsap.set(spiralLeftPath, {
      strokeDasharray: 'none',
      strokeDashoffset: 0,
      clearProps: 'strokeDasharray,strokeDashoffset',
    });
  }
}

function initSlide() {
  // 현재 활성 슬라이드 추적
  let currentSlide = 0; // 0: home, 1: profile, 2: project

  // 모든 왼쪽 버튼(이전 슬라이드로 이동)에 이벤트 추가
  const leftButtons = document.querySelectorAll('.station--left');
  leftButtons.forEach(button => {
    button.addEventListener('click', () => {
      console.log('왼쪽 버튼 클릭됨! 현재 슬라이드:', currentSlide);

      if (currentSlide === 1) {
        resetProfileElements();

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
        gsap
          .to('.profile', {
            x: '-100vw',
            duration: 1,
            ease: 'power2.inOut',
          })
          .then(() => {
            const element = document.querySelector('.profile__image__group');
            if (element) {
              element.style.visibility = 'visible';
            }

            // SVG 애니메이션들을 순차적으로 실행
            const tl = gsap.timeline();

            // 1. 파티 아이콘 회전 + 스케일 애니메이션
            tl.fromTo(
              '.profile__party__image',
              {
                scale: 0,
                rotation: -180,
                opacity: 0,
              },
              {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'back.out(1.7)',
              }
            )
              // 2. 반짝이 효과들 순차 등장
              .fromTo(
                '.profile__sparkle__image',
                {
                  scale: 0,
                  y: -20,
                  opacity: 0,
                },
                {
                  scale: 1,
                  y: 0,
                  opacity: 1,
                  duration: 0.5,
                  ease: 'bounce.out',
                },
                '-=0.3'
              )
              .fromTo(
                '.profile__fill-sparkle__image',
                {
                  scale: 0,
                  opacity: 0,
                },
                {
                  scale: 1,
                  opacity: 1,
                  duration: 0.5,
                  ease: 'bounce.out',
                },
                '-=0.2'
              )
              // 3. 스프링 그리기 애니메이션 실행
              .call(
                () => {
                  // 스프링 SVG를 먼저 표시
                  gsap.set('.profile__spiral__image--right', {
                    display: 'block',
                    opacity: 1,
                  });

                  // 선 그리기 애니메이션 실행
                  animateSpiralDraw('.profile__spiral__image--right path');
                },
                null,
                '-=0.6'
              )
              .call(
                () => {
                  // 스프링 SVG를 먼저 표시
                  gsap.set('.profile__spiral__image--left', {
                    display: 'block',
                    opacity: 1,
                  });

                  // 선 그리기 애니메이션 실행
                  animateSpiralDraw('.profile__spiral__image--left path');
                },
                null,
                '-=0.6'
              )
              // 4. 프로필 이미지 마지막에 등장
              .fromTo(
                '.profile__me__image',
                {
                  scale: 0.5,
                  y: 30,
                  opacity: 0,
                },
                {
                  scale: 1,
                  y: 0,
                  opacity: 1,
                  duration: 0.7,
                  ease: 'power2.out',
                },
                '-=0.3'
              );

            // 한 번만 실행되는 애니메이션 효과들
            // 파티 아이콘 회전 (한 바퀴만)
            gsap.to('.profile__party__image', {
              rotation: 360,
              duration: 2,
              ease: 'power2.out',
            });

            // 스프링 이미지들 살짝 회전 (한 번만)
            gsap.to('.profile__spiral__image--left', {
              rotation: -120,
              duration: 1.2,
              ease: 'elastic.out(1, 0.3)',
            });

            gsap.to('.profile__spiral__image--right', {
              rotation: 10,
              duration: 1.2,
              ease: 'elastic.out(1, 0.3)',
            });
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
