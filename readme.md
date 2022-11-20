# 간소화 반응형 컴포넌트와 스토어(복기)
* 간단히 구현하여 사용할 수 있는 vanilla javascipt 컴포넌트
* 반응형 컴포넌트 기초 학습용

## 구조 
* component
  * 다른 컴포넌트를 생성하는 기초
* store
  * 공통 상태 관리를 위한 스토어

## 사용예
* demo 브랜치 확인

## 개선이 가능한 사항
* 반응형 최적화
  * 아래 코드처럼 isRender가 매 render시마다 renderState를 중복해서 누적시키고 있다.
  ```javascript
    get: (target, key, reciever) => {
        if(isRender) {
          renderState.push(key);
        }
        return Reflect.get(target, key, reciever);
      },
    ======================================================
    this.render = () => {
    isRender = true;
    const childs = renderFuntion.call(state);
    if (typeof childs === 'string') {
      rootEl.innerHTML = childs;
    }
    if (typeof childs === 'object') {
      for (const child of childs) {
        rootEl.appendChild(child);
      }
    }
    isRender = false;
  };
  ```
  * set 자료형을 통해 중복을 줄여야 한다. (mounted 전에만 호출 시 선택적으로 호출하는 state는 놓칠 수 있다)
* vuex에서 사용 가능한 getters 미구현, mutaion은 actions로 통합
  * getters는 render처럼 참조하는 state가 업데이트 되면 업데이트 되며 state처럼 로컬 state와 연결
  * 편의상 구현되지 않은 mutation은 기존의 actions를 사용하고 actions는 mutation을 bind하고 mutaion은 state를 bind하면 깔끔한 코드가 될 것이다.
* 렌더링 최적화
  * 한 컴포넌트에 영향을 주는 변수 여러 개가 한 함수에 의해 변화하더라도 각각의 변수 변화가 렌더링을 호출하는 문제가 있다.
  * render의 호출을 requestAnimationFrame으로 미루고 그동안 같은 함수 내에서의 호출을 막아 해결할 수 있다.
* props와 memoization
  * memoization이 없는 props 전달은 성능상의 이슈와 오류가 발생할 가능성이 높다고 생각하여 사용하지 않았다.
* 가볍게 작성되었고 Anneong.js로 개선된 프레임워크 제작중