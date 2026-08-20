import { ref, watch } from 'vue'

const STORAGE_KEY = 'gym-theme'
const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
const theme = ref(stored === 'female' ? 'female' : 'male')

function applyThemeToDom(value) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', value)
}

applyThemeToDom(theme.value)

watch(theme, (value) => {
  applyThemeToDom(value)
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, value)
  }
})

export function useTheme() {
  const isFemale = () => theme.value === 'female'

  function setTheme(value) {
    theme.value = value === 'female' ? 'female' : 'male'
  }

  function toggleTheme() {
    theme.value = theme.value === 'male' ? 'female' : 'male'
  }

  return { theme, isFemale, setTheme, toggleTheme }
}