import { DefaultWhitelist, sanitizeHtml } from '../../../src/util/sanitizer'

describe('Sanitizer', () => {
  describe('sanitizeHtml', () => {
    it('should return the same on empty string', () => {
      const empty = ''

      const result = sanitizeHtml(empty, DefaultWhitelist, null)

      expect(result).toEqual(empty)
    })

    it('should sanitize template by removing tags with XSS', () => {
      const template = [
        '<div>',
        '  <a href="javascript:alert(7)">Click me</a>',
        '  <span>Some content</span>',
        '</div>'
      ].join('')

      const result = sanitizeHtml(template, DefaultWhitelist, null)

      expect(result.includes('script')).toEqual(false)
    })

    it('should allow aria attributes and safe attributes', () => {
      const template = [
        '<div aria-pressed="true">',
        '  <span class="test">Some content</span>',
        '</div>'
      ].join('')

      const result = sanitizeHtml(template, DefaultWhitelist, null)

      expect(result.includes('aria-pressed')).toEqual(true)
      expect(result.includes('class="test"')).toEqual(true)
    })

    it('should remove not whitelist tags', () => {
      const template = [
        '<div>',
        '  <script>alert(7)</script>',
        '</div>'
      ].join('')

      const result = sanitizeHtml(template, DefaultWhitelist, null)

      expect(result.includes('<script>')).toEqual(false)
    })

    it('should not use native api to sanitize if a custom function passed', () => {
      const template = [
        '<div>',
        '  <span>Some content</span>',
        '</div>'
      ].join('')

      function mySanitize(htmlUnsafe) {
        return htmlUnsafe
      }

      spyOn(DOMParser.prototype, 'parseFromString')

      const result = sanitizeHtml(template, DefaultWhitelist, mySanitize)

      expect(result).toEqual(template)
      expect(DOMParser.prototype.parseFromString).not.toHaveBeenCalled()
    })
  })
})
