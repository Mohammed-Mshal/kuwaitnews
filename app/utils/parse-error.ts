type validationError = {
  code: string,
  detail: string,
  attr?: string
}

type ErrorResponse = {
  type: string,
  errors: validationError[]
}

function toTitleCase(str: string) {
  return str.split('_').map((word) => {
    word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase()
  })
    .join(' ')
}

export function parseError(error: ErrorResponse | { message: string } | [{ message: string }] | any): string {
  if (error.message) {
    return `
      <div style="text-align: center;">
        <h3>Error</h3>
      </div>
      <div class="error-line">
        ${error.message}
      </div>
    `.trim()
  }

  if (Array.isArray(error) && error.length > 0 && error[0].message) {
    return `
      <div style="text-align: center;">
        <h3>Error</h3>
      </div>
      <div class="error-line">
        ${error[0].message}
      </div>
    `.trim()
  }

  if (!error || !error.errors || !Array.isArray(error.errors)) {
    return '<div style="text-align: center;"><h3>An error occurred</h3></div>'
  }

  const errorType = error.type ? toTitleCase(error.type) : 'Error'

  const errorLines = error.errors
    .filter((err: validationError) => err.attr || err.detail)
    .map((err: validationError) => {
      const attr = err.attr ? `<strong>${toTitleCase(err.attr)}</strong>: ` : ''
      return `<div class="error-line">${attr}${err.detail}</div>`
    }).join('')

  return `
    <div style="text-align: center;">
      <h3>${errorType}</h3>
    </div>
    <div class="error-line">
      ${errorLines}
    </div>
  `.trim()
}