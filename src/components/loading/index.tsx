import Loading from './loading'
import ReactDOM from 'react-dom/client'

let loadingcount = 0

export const showLoading = () => {
  if (loadingcount === 0) {
    let dom = document.createElement('div')
    dom.setAttribute('id', 'loading')
    document.body.appendChild(dom)
    ReactDOM.createRoot(dom).render(<Loading />)
  }
  loadingcount++
}

export const hideLoading = () => {
  if (loadingcount <= 0) return
  loadingcount--
  if (loadingcount === 0) {
    document.body.removeChild(document.getElementById('loading') as HTMLElement)
  }
}
