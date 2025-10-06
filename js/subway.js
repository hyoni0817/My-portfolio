/**
 * 티켓 게이트 문 열리는 애니메이션
 * - 지하철이 문이 열린 상태로 멈춰있는 경우, 티켓 게이트를 통과 후 3초 뒤에 지하철 문이 닫히고 지하철이 출발함.
 */
function handleClickTicketGate() {
  // 티켓 게이트 문 열리는 애니메이션
  gsap.to('.subway__ticket__gate__door__image--left', { x: -54 });
  gsap.to('.subway__ticket__gate__door__image--right', { x: 50 });
  // 3초 뒤에 지하철 문 닫히는 애니메이션
  gsap.to('.subway__train__door__image--left', { x: 0, delay: 3 });
  gsap.to('.subway__train__door__image--right', { x: 0, delay: 3 });
  // 3초 뒤에 티켓 게이트 문 닫히는 애니메이션
  gsap.to('.subway__ticket__gate__door__image--left', { x: 0, delay: 1 });
  gsap.to('.subway__ticket__gate__door__image--right', {
    x: 0,
    delay: 1,
  });

  gsap.to('.subway__train', {
    x: 9999,
    duration: 3,
    delay: 4,
    ease: 'power2.in',
  });
}
