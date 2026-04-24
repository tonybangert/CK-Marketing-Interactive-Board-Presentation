import { useEffect, useReducer, useCallback } from 'react'

// Deck state: which slide, which build step within that slide, and whether
// navigation direction is forward or backward (for exit animation direction).
function reducer(state, action) {
  const { slides } = action
  switch (action.type) {
    case 'NEXT': {
      const maxStep = slides[state.slideIndex].steps
      if (state.step < maxStep) {
        return { ...state, step: state.step + 1, direction: 1 }
      }
      if (state.slideIndex < slides.length - 1) {
        return { slideIndex: state.slideIndex + 1, step: 0, direction: 1 }
      }
      return state
    }
    case 'PREV': {
      if (state.step > 0) {
        return { ...state, step: state.step - 1, direction: -1 }
      }
      if (state.slideIndex > 0) {
        const prev = state.slideIndex - 1
        return { slideIndex: prev, step: slides[prev].steps, direction: -1 }
      }
      return state
    }
    case 'JUMP_SLIDE': {
      const target = Math.max(0, Math.min(slides.length - 1, action.index))
      return {
        slideIndex: target,
        step: 0,
        direction: target > state.slideIndex ? 1 : -1
      }
    }
    case 'RESTART_SLIDE':
      return { ...state, step: 0, direction: -1 }
    case 'FILL_SLIDE':
      return { ...state, step: slides[state.slideIndex].steps, direction: 1 }
    default:
      return state
  }
}

export function useDeckState(slides) {
  const [state, dispatch] = useReducer(reducer, { slideIndex: 0, step: 0, direction: 1 })

  const next = useCallback(() => dispatch({ type: 'NEXT', slides }), [slides])
  const prev = useCallback(() => dispatch({ type: 'PREV', slides }), [slides])
  const jumpSlide = useCallback((i) => dispatch({ type: 'JUMP_SLIDE', slides, index: i }), [slides])
  const restartSlide = useCallback(() => dispatch({ type: 'RESTART_SLIDE', slides }), [slides])
  const fillSlide = useCallback(() => dispatch({ type: 'FILL_SLIDE', slides }), [slides])

  useEffect(() => {
    const onKey = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
        case 'Enter':
          e.preventDefault(); next(); break
        case 'ArrowLeft':
        case 'PageUp':
        case 'Backspace':
          e.preventDefault(); prev(); break
        case 'Home':
          e.preventDefault(); jumpSlide(0); break
        case 'End':
          e.preventDefault(); jumpSlide(slides.length - 1); break
        case 'r': case 'R':
          restartSlide(); break
        case 'f': case 'F':
          fillSlide(); break
        default:
          if (/^[1-9]$/.test(e.key) && Number(e.key) <= slides.length) {
            jumpSlide(Number(e.key) - 1)
          }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, jumpSlide, restartSlide, fillSlide, slides.length])

  return { ...state, next, prev, jumpSlide, restartSlide, fillSlide }
}
