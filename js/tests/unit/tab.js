$(function () {
  'use strict'

  var Tab = typeof window.bootstrap === 'undefined' ? window.Tab : window.bootstrap.Tab

  QUnit.module('tabs plugin')

  QUnit.test('should be defined on jquery object', function (assert) {
    assert.expect(1)
    assert.ok($(document.body).tab, 'tabs method is defined')
  })

  QUnit.module('tabs', {
    beforeEach: function () {
      // Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
      $.fn.bootstrapTab = $.fn.tab.noConflict()
    },
    afterEach: function () {
      $.fn.tab = $.fn.bootstrapTab
      delete $.fn.bootstrapTab
      $('#qunit-fixture').html('')
    }
  })

  QUnit.test('should provide no conflict', function (assert) {
    assert.expect(1)
    assert.strictEqual(typeof $.fn.tab, 'undefined', 'tab was set back to undefined (org value)')
  })

  QUnit.test('should throw explicit error on undefined method', function (assert) {
    assert.expect(1)
    var $el = $('<div/>')
    $el.bootstrapTab()
    try {
      $el.bootstrapTab('noMethod')
    } catch (error) {
      assert.strictEqual(error.message, 'No method named "noMethod"')
    }
  })

  QUnit.test('should return jquery collection containing the element', function (assert) {
    assert.expect(2)
    var $el = $('<div/>')
    var $tab = $el.bootstrapTab()
    assert.ok($tab instanceof $, 'returns jquery collection')
    assert.strictEqual($tab[0], $el[0], 'collection contains element')
  })

  QUnit.test('should activate element by tab id', function (assert) {
    assert.expect(2)
    var tabsHTML = '<ul class="nav">' +
        '<li><a href="#home">Home</a></li>' +
        '<li><a href="#profile">Profile</a></li>' +
        '</ul>'

    $('<ul><li id="home"/><li id="profile"/></ul>').appendTo('#qunit-fixture')

    $(tabsHTML).find('li:last-child a').bootstrapTab('show')
    assert.strictEqual($('#qunit-fixture').find('.active').attr('id'), 'profile')

    $(tabsHTML).find('li:first-child a').bootstrapTab('show')
    assert.strictEqual($('#qunit-fixture').find('.active').attr('id'), 'home')
  })

  QUnit.test('should activate element by tab id', function (assert) {
    assert.expect(2)
    var pillsHTML = '<ul class="nav nav-pills">' +
        '<li><a href="#home">Home</a></li>' +
        '<li><a href="#profile">Profile</a></li>' +
        '</ul>'

    $('<ul><li id="home"/><li id="profile"/></ul>').appendTo('#qunit-fixture')

    $(pillsHTML).find('li:last-child a').bootstrapTab('show')
    assert.strictEqual($('#qunit-fixture').find('.active').attr('id'), 'profile')

    $(pillsHTML).find('li:first-child a').bootstrapTab('show')
    assert.strictEqual($('#qunit-fixture').find('.active').attr('id'), 'home')
  })

  QUnit.test('should activate element by tab id in ordered list', function (assert) {
    assert.expect(2)
    var pillsHTML = '<ol class="nav nav-pills">' +
        '<li><a href="#home">Home</a></li>' +
        '<li><a href="#profile">Profile</a></li>' +
        '</ol>'

    $('<ol><li id="home"/><li id="profile"/></ol>').appendTo('#qunit-fixture')

    $(pillsHTML).find('li:last-child a').bootstrapTab('show')
    assert.strictEqual($('#qunit-fixture').find('.active').attr('id'), 'profile')

    $(pillsHTML).find('li:first-child a').bootstrapTab('show')
    assert.strictEqual($('#qunit-fixture').find('.active').attr('id'), 'home')
  })

  QUnit.test('should activate element by tab id in nav list', function (assert) {
    assert.expect(2)
    var tabsHTML = '<nav class="nav">' +
                      '<a href="#home">Home</a>' +
                      '<a href="#profile">Profile</a>' +
                    '</nav>'

    $('<nav><div id="home"></div><div id="profile"></div></nav>').appendTo('#qunit-fixture')

    $(tabsHTML).find('a:last-child').bootstrapTab('show')
    assert.strictEqual($('#qunit-fixture').find('.active').attr('id'), 'profile')

    $(tabsHTML).find('a:first-child').bootstrapTab('show')
    assert.strictEqual($('#qunit-fixture').find('.active').attr('id'), 'home')
  })

  QUnit.test('should activate element by tab id in list group', function (assert) {
    assert.expect(2)
    var tabsHTML = '<div class="list-group">' +
                      '<a href="#home">Home</a>' +
                      '<a href="#profile">Profile</a>' +
                    '</div>'

    $('<nav><div id="home"></div><div id="profile"></div></nav>').appendTo('#qunit-fixture')

    $(tabsHTML).find('a:last-child').bootstrapTab('show')
    assert.strictEqual($('#qunit-fixture').find('.active').attr('id'), 'profile')

    $(tabsHTML).find('a:first-child').bootstrapTab('show')
    assert.strictEqual($('#qunit-fixture').find('.active').attr('id'), 'home')
  })

  QUnit.test('should not fire shown when show is prevented', function (assert) {
    assert.expect(1)
    var done = assert.async()

    $('<div class="nav"/>')
      .on('show.bs.tab', function (e) {
        e.preventDefault()
        assert.ok(true, 'show event fired')
        done()
      })
      .on('shown.bs.tab', function () {
        assert.ok(false, 'shown event fired')
      })
      .bootstrapTab('show')
  })

  QUnit.test('should not fire shown when tab is already active', function (assert) {
    assert.expect(0)
    var tabsHTML = '<ul class="nav nav-tabs" role="tablist">' +
      '<li class="nav-item"><a href="#home" class="nav-link active" role="tab">Home</a></li>' +
      '<li class="nav-item"><a href="#profile" class="nav-link" role="tab">Profile</a></li>' +
      '</ul>' +
      '<div class="tab-content">' +
      '<div class="tab-pane active" id="home" role="tabpanel"></div>' +
      '<div class="tab-pane" id="profile" role="tabpanel"></div>' +
      '</div>'

    $(tabsHTML)
      .find('a.active')
      .on('shown.bs.tab', function () {
        assert.ok(true, 'shown event fired')
      })
      .bootstrapTab('show')
  })

  QUnit.test('should not fire shown when tab is disabled', function (assert) {
    assert.expect(0)
    var tabsHTML = '<ul class="nav nav-tabs" role="tablist">' +
      '<li class="nav-item"><a href="#home" class="nav-link active" role="tab">Home</a></li>' +
      '<li class="nav-item"><a href="#profile" class="nav-link disabled" role="tab">Profile</a></li>' +
      '</ul>' +
      '<div class="tab-content">' +
      '<div class="tab-pane active" id="home" role="tabpanel"></div>' +
      '<div class="tab-pane" id="profile" role="tabpanel"></div>' +
      '</div>'

    $(tabsHTML)
      .find('a.disabled')
      .on('shown.bs.tab', function () {
        assert.ok(true, 'shown event fired')
      })
      .bootstrapTab('show')
  })

  QUnit.test('should fire hide and hidden events', function (assert) {
    assert.expect(2)
    var done = assert.async()

    var tabsHTML = '<ul class="nav">' +
        '<li><a href="#home">Home</a></li>' +
        '<li><a href="#profile">Profile</a></li>' +
        '</ul>'

    $(tabsHTML)
      .find('li:first-child a')
      .on('hide.bs.tab', function () {
        assert.ok(true, 'hide event fired')
      })
      .bootstrapTab('show')
      .end()
      .find('li:last-child a')
      .bootstrapTab('show')

    $(tabsHTML)
      .find('li:first-child a')
      .on('hidden.bs.tab', function () {
        assert.ok(true, 'hidden event fired')
        done()
      })
      .bootstrapTab('show')
      .end()
      .find('li:last-child a')
      .bootstrapTab('show')
  })

  QUnit.test('should not fire hidden when hide is prevented', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var tabsHTML = '<ul class="nav">' +
        '<li><a href="#home">Home</a></li>' +
        '<li><a href="#profile">Profile</a></li>' +
        '</ul>'

    $(tabsHTML)
      .find('li:first-child a')
      .on('hide.bs.tab', function (e) {
        e.preventDefault()
        assert.ok(true, 'hide event fired')
        done()
      })
      .on('hidden.bs.tab', function () {
        assert.ok(false, 'hidden event fired')
      })
      .bootstrapTab('show')
      .end()
      .find('li:last-child a')
      .bootstrapTab('show')
  })

  QUnit.test('show and shown events should reference correct relatedTarget', function (assert) {
    assert.expect(2)
    var done = assert.async()

    var tabsHTML = '<ul class="nav">' +
    '<li><a href="#home">Home</a></li>' +
    '<li><a href="#profile">Profile</a></li>' +
    '</ul>'

    $(tabsHTML)
      .find('li:first-child a')
      .bootstrapTab('show')
      .end()
      .find('li:last-child a')
      .on('show.bs.tab', function (e) {
        assert.strictEqual(e.relatedTarget.hash, '#home', 'references correct element as relatedTarget')
      })
      .on('shown.bs.tab', function (e) {
        assert.strictEqual(e.relatedTarget.hash, '#home', 'references correct element as relatedTarget')
        done()
      })
      .bootstrapTab('show')
  })

  QUnit.test('hide and hidden events contain correct relatedTarget', function (assert) {
    assert.expect(2)
    var done = assert.async()

    var tabsHTML = '<ul class="nav">' +
        '<li><a href="#home">Home</a></li>' +
        '<li><a href="#profile">Profile</a></li>' +
        '</ul>'

    $(tabsHTML)
      .find('li:first-child a')
      .on('hide.bs.tab', function (e) {
        assert.strictEqual(e.relatedTarget.hash, '#profile', 'references correct element as relatedTarget')
      })
      .on('hidden.bs.tab', function (e) {
        assert.strictEqual(e.relatedTarget.hash, '#profile', 'references correct element as relatedTarget')
        done()
      })
      .bootstrapTab('show')
      .end()
      .find('li:last-child a')
      .bootstrapTab('show')
  })

  QUnit.test('selected tab should have aria-selected', function (assert) {
    assert.expect(8)
    var tabsHTML = '<ul class="nav nav-tabs" role="tablist">' +
        '<li><a class="nav-item active" href="#home" data-toggle="tab" role="tab" aria-selected="true">Home</a></li>' +
        '<li><a class="nav-item" href="#profile" data-toggle="tab" role="tab" aria-selected="false">Profile</a></li>' +
        '</ul>'
    var $tabs = $(tabsHTML).appendTo('#qunit-fixture')

    $tabs.find('li:first-child a').bootstrapTab('show')
    assert.strictEqual($tabs.find('.active').attr('aria-selected'), 'true', 'shown tab has aria-selected = true')
    assert.strictEqual($tabs.find('a:not(.active)').attr('aria-selected'), 'false', 'hidden tab has aria-selected = false')

    $tabs.find('li:last-child a').trigger('click')
    assert.strictEqual($tabs.find('.active').attr('aria-selected'), 'true', 'after click, shown tab has aria-selected = true')
    assert.strictEqual($tabs.find('a:not(.active)').attr('aria-selected'), 'false', 'after click, hidden tab has aria-selected = false')

    $tabs.find('li:first-child a').bootstrapTab('show')
    assert.strictEqual($tabs.find('.active').attr('aria-selected'), 'true', 'shown tab has aria-selected = true')
    assert.strictEqual($tabs.find('a:not(.active)').attr('aria-selected'), 'false', 'hidden tab has aria-selected = false')

    $tabs.find('li:first-child a').trigger('click')
    assert.strictEqual($tabs.find('.active').attr('aria-selected'), 'true', 'after second show event, shown tab still has aria-selected = true')
    assert.strictEqual($tabs.find('a:not(.active)').attr('aria-selected'), 'false', 'after second show event, hidden tab has aria-selected = false')
  })

  QUnit.test('selected tab should deactivate previous selected tab', function (assert) {
    assert.expect(2)
    var tabsHTML = '<ul class="nav nav-tabs">' +
        '<li class="nav-item"><a class="nav-link active" href="#home" data-toggle="tab">Home</a></li>' +
        '<li class="nav-item"><a class="nav-link" href="#profile" data-toggle="tab">Profile</a></li>' +
        '</ul>'
    var $tabs = $(tabsHTML).appendTo('#qunit-fixture')

    $tabs.find('li:last-child a')[0].click()
    assert.notOk($tabs.find('li:first-child a').hasClass('active'))
    assert.ok($tabs.find('li:last-child a').hasClass('active'))
  })

  QUnit.test('Nested tabs', function (assert) {
    assert.expect(2)
    var done = assert.async()
    var tabsHTML =
        '<nav class="nav nav-tabs" role="tablist">' +
        '  <a id="tab1" href="#x-tab1" class="nav-item nav-link" data-toggle="tab" role="tab" aria-controls="x-tab1">Tab 1</a>' +
        '  <a href="#x-tab2" class="nav-item nav-link active" data-toggle="tab" role="tab" aria-controls="x-tab2" aria-selected="true">Tab 2</a>' +
        '  <a href="#x-tab3" class="nav-item nav-link" data-toggle="tab" role="tab" aria-controls="x-tab3">Tab 3</a>' +
        '</nav>' +
        '<div class="tab-content">' +
        '  <div class="tab-pane" id="x-tab1" role="tabpanel">' +
        '    <nav class="nav nav-tabs" role="tablist">' +
        '      <a href="#nested-tab1" class="nav-item nav-link active" data-toggle="tab" role="tab" aria-controls="x-tab1" aria-selected="true">Nested Tab 1</a>' +
        '      <a id="tabNested2" href="#nested-tab2" class="nav-item nav-link" data-toggle="tab" role="tab" aria-controls="x-profile">Nested Tab2</a>' +
        '    </nav>' +
        '    <div class="tab-content">' +
        '      <div class="tab-pane active" id="nested-tab1" role="tabpanel">Nested Tab1 Content</div>' +
        '      <div class="tab-pane" id="nested-tab2" role="tabpanel">Nested Tab2 Content</div>' +
        '    </div>' +
        '  </div>' +
        '  <div class="tab-pane active" id="x-tab2" role="tabpanel">Tab2 Content</div>' +
        '  <div class="tab-pane" id="x-tab3" role="tabpanel">Tab3 Content</div>' +
        '</div>'

    $(tabsHTML).appendTo('#qunit-fixture')

    $('#tabNested2').on('shown.bs.tab', function () {
      assert.ok($('#x-tab1').hasClass('active'))
      done()
    })

    $('#tab1').on('shown.bs.tab', function () {
      assert.ok($('#x-tab1').hasClass('active'))
      $('#tabNested2')[0].click()
    })

    $('#tab1')[0].click()
  })

  QUnit.test('should not remove fade class if no active pane is present', function (assert) {
    assert.expect(6)
    var done = assert.async()
    var tabsHTML = '<ul class="nav nav-tabs" role="tablist">' +
      '<li class="nav-item"><a id="tab-home" href="#home" class="nav-link" data-toggle="tab" role="tab">Home</a></li>' +
      '<li class="nav-item"><a id="tab-profile" href="#profile" class="nav-link" data-toggle="tab" role="tab">Profile</a></li>' +
      '</ul>' +
      '<div class="tab-content">' +
      '<div class="tab-pane fade" id="home" role="tabpanel"></div>' +
      '<div class="tab-pane fade" id="profile" role="tabpanel"></div>' +
      '</div>'

    $(tabsHTML).appendTo('#qunit-fixture')
    $('#tab-profile')
      .on('shown.bs.tab', function () {
        assert.ok($('#profile').hasClass('fade'))
        assert.ok($('#profile').hasClass('show'))

        $('#tab-home')
          .on('shown.bs.tab', function () {
            assert.ok($('#profile').hasClass('fade'))
            assert.notOk($('#profile').hasClass('show'))
            assert.ok($('#home').hasClass('fade'))
            assert.ok($('#home').hasClass('show'))

            done()
          })

        $('#tab-home')[0].click()
      })

    $('#tab-profile')[0].click()
  })

  QUnit.test('should handle removed tabs', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var html = [
      '<ul class="nav nav-tabs" role="tablist">',
      '  <li class="nav-item">',
      '    <a class="nav-link nav-tab" href="#profile" role="tab" data-toggle="tab">',
      '      <button class="close"><span aria-hidden="true">&times;</span></button>',
      '    </a>',
      '  </li>',
      '  <li class="nav-item">',
      '    <a id="secondNav" class="nav-link nav-tab" href="#buzz" role="tab" data-toggle="tab">',
      '      <button class="close"><span aria-hidden="true">&times;</span></button>',
      '    </a>',
      '  </li>',
      '  <li class="nav-item">',
      '    <a class="nav-link nav-tab" href="#references" role="tab" data-toggle="tab">',
      '      <button id="btnClose" class="close"><span aria-hidden="true">&times;</span></button>',
      '    </a>',
      '  </li>',
      '</ul>',
      '<div class="tab-content">',
      '  <div role="tabpanel" class="tab-pane fade show active" id="profile">test 1</div>',
      '  <div role="tabpanel" class="tab-pane fade" id="buzz">test 2</div>',
      '  <div role="tabpanel" class="tab-pane fade" id="references">test 3</div>',
      '</div>'
    ].join('')

    $(html).appendTo('#qunit-fixture')

    $('#secondNav').on('shown.bs.tab', function () {
      assert.strictEqual($('.nav-tab').length, 2)
      done()
    })

    $('#btnClose').one('click', function () {
      var tabId = $(this).parents('a').attr('href')
      $(this).parents('li').remove()
      $(tabId).remove()
      $('.nav-tabs a:last').bootstrapTab('show')
    })
      .trigger($.Event('click'))
  })

  QUnit.test('should not add show class to tab panes if there is no `.fade` class', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var html = [
      '<ul class="nav nav-tabs" role="tablist">',
      '  <li class="nav-item">',
      '    <a class="nav-link nav-tab" href="#home" role="tab" data-toggle="tab">Home</a>',
      '  </li>',
      '  <li class="nav-item">',
      '    <a id="secondNav" class="nav-link nav-tab" href="#profile" role="tab" data-toggle="tab">Profile</a>',
      '  </li>',
      '</ul>',
      '<div class="tab-content">',
      '  <div role="tabpanel" class="tab-pane" id="home">test 1</div>',
      '  <div role="tabpanel" class="tab-pane" id="profile">test 2</div>',
      '</div>'
    ].join('')

    $(html).appendTo('#qunit-fixture')

    $('#secondNav').on('shown.bs.tab', function () {
      assert.strictEqual($('.show').length, 0)
      done()
    })

    $('#secondNav')[0].click()
  })

  QUnit.test('should add show class to tab panes if there is a `.fade` class', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var html = [
      '<ul class="nav nav-tabs" role="tablist">',
      '  <li class="nav-item">',
      '    <a class="nav-link nav-tab" href="#home" role="tab" data-toggle="tab">Home</a>',
      '  </li>',
      '  <li class="nav-item">',
      '    <a id="secondNav" class="nav-link nav-tab" href="#profile" role="tab" data-toggle="tab">Profile</a>',
      '  </li>',
      '</ul>',
      '<div class="tab-content">',
      '  <div role="tabpanel" class="tab-pane fade" id="home">test 1</div>',
      '  <div role="tabpanel" class="tab-pane fade" id="profile">test 2</div>',
      '</div>'
    ].join('')

    $(html).appendTo('#qunit-fixture')

    $('#secondNav').on('shown.bs.tab', function () {
      assert.strictEqual($('.show').length, 1)
      done()
    })

    $('#secondNav')[0].click()
  })

  QUnit.test('should initialize tab list: only one tab control focusable and aria-selected', function (assert) {
    assert.expect(5)
    var done = assert.async()

    var tabsHTML = '<ul class="nav nav-tabs" role="tablist">' +
        '<li><a class="nav-item active" href="#home" data-toggle="tab" role="tab" aria-selected="true">Home</a></li>' +
        '<li><a class="nav-item" href="#profile" data-toggle="tab" role="tab" aria-selected="true">Profile</a></li>' +
        '<li><a class="nav-item" href="#contact" data-toggle="tab" role="tab" aria-selected="true">Contact</a></li>' +
        '</ul>' /* purposely incorrect, with all set to aria-selected="true" */
    var $tabs = $(tabsHTML).appendTo('#qunit-fixture')
    window.dispatchEvent(new Event('load'))

    setTimeout(function () {
      assert.strictEqual($tabs.find('li:first-child a').attr('tabindex'), '0', 'first found aria-selected="true" control has been given tabindex="0"')
      assert.strictEqual($tabs.find('li:nth-child(2) a').attr('tabindex'), '-1', 'second control has been given tabindex="-1"')
      assert.strictEqual($tabs.find('li:nth-child(2) a').attr('aria-selected'), 'false', 'second control has been given aria-selected="false"')
      assert.strictEqual($tabs.find('li:nth-child(3) a').attr('tabindex'), '-1', 'third control has been given tabindex="-1"')
      assert.strictEqual($tabs.find('li:nth-child(3) a').attr('aria-selected'), 'false', 'third control has been given aria-selected="false"')
      done()
    }, 10)
  })

  QUnit.test('should initialize tab list: if no tab control has aria-selected="true", set it to the first one', function (assert) {
    assert.expect(3)
    var done = assert.async()

    var tabsHTML = '<ul class="nav nav-tabs" role="tablist">' +
        '<li><a class="nav-item active" href="#home" data-toggle="tab">Home</a></li>' +
        '<li><a class="nav-item" href="#profile" data-toggle="tab">Profile</a></li>' +
        '<li><a class="nav-item" href="#contact" data-toggle="tab">Contact</a></li>' +
        '</ul>' /* purposely incorrect, left out aria-selected="true" on active one */
    var $tabs = $(tabsHTML).appendTo('#qunit-fixture')
    window.dispatchEvent(new Event('load'))

    setTimeout(function () {
      assert.strictEqual($tabs.find('li:first-child a').attr('aria-selected'), 'true', 'first control has been given aria-selected="true"')
      assert.strictEqual($tabs.find('li:nth-child(2) a').attr('aria-selected'), 'false', 'second control has been given aria-selected="false"')
      assert.strictEqual($tabs.find('li:nth-child(3) a').attr('aria-selected'), 'false', 'third control has been given aria-selected="false"')
      done()
    }, 10)
  })

  QUnit.test('should correctly switch tabs in response to left/right cursor keys (for horizontal/default tablist) and ignore up/down cursor keys', function (assert) {
    assert.expect(27)
    var done = assert.async()

    var tabsHTML = '<ul class="nav nav-tabs" role="tablist">' +
        '<li><a class="nav-item active" href="#home" data-toggle="tab" role="tab" tabindex="0" aria-selected="true">Home</a></li>' +
        '<li><a class="nav-item" href="#profile" data-toggle="tab" role="tab" tabindex="-1" aria-selected="false">Profile</a></li>' +
        '<li><a class="nav-item" href="#contact" data-toggle="tab" role="tab" tabindex="-1" aria-selected="false">Contact</a></li>' +
        '</ul>' +
        '<div class="tab-pane show active" id="home" role="tabpanel">...</div>' +
        '<div class="tab-pane" id="profile" role="tabpanel">...</div>' +
        '<div class="tab-pane" id="contact" role="tabpanel">...</div>'
    var $tabs = $(tabsHTML).appendTo('#qunit-fixture')

    var $firstTab = $tabs.find('li:first-child a')
    var $secondTab = $tabs.find('li:nth-child(2) a')
    var $thirdTab = $tabs.find('li:nth-child(3) a')
    $firstTab[0].focus() /* set focus to first tab */
    assert.ok(document.activeElement === $firstTab[0], 'first tab successfully focused')
    /* right cursor key */
    var keyDown = new Event('keydown')
    keyDown.which = 39
    $firstTab[0].dispatchEvent(keyDown)
    assert.ok(document.activeElement !== $firstTab[0], 'after 1st right cursor key, first tab not focused anymore')
    assert.ok(!$firstTab.hasClass('active'), 'after 1st right cursor key, first tab not `.active` anymore')
    assert.ok($firstTab.attr('aria-selected') === 'false', 'after 1st right cursor key, first tab has aria-selected="false"')
    assert.ok($firstTab.attr('tabindex') === '-1', 'after 1st right cursor key, first tab has tabindex="-1"')
    assert.ok(document.activeElement === $secondTab[0], 'after 1st right cursor key, second tab is focused')
    assert.ok($secondTab.hasClass('active'), 'after 1st right cursor key, second tab is `.active`')
    assert.ok($secondTab.attr('aria-selected') === 'true', 'after 1st right cursor key, second tab has aria-selected="true"')
    assert.ok($secondTab.attr('tabindex') === '0', 'after 1st right cursor key, second tab has tabindex="0"')
    /* right cursor key */
    $secondTab[0].dispatchEvent(keyDown)
    assert.ok(document.activeElement !== $secondTab[0], 'after 2nd right cursor key, second tab not focused anymore')
    assert.ok(!$secondTab.hasClass('active'), 'after 2nd right cursor key, second tab not `.active` anymore')
    assert.ok($secondTab.attr('aria-selected') === 'false', 'after 2nd right cursor key, second tab has aria-selected="false"')
    assert.ok($secondTab.attr('tabindex') === '-1', 'after 2nd right cursor key, second tab has tabindex="-1"')
    assert.ok(document.activeElement === $thirdTab[0], 'after 2nd right cursor key, third tab is focused')
    assert.ok($thirdTab.hasClass('active'), 'after 2nd right cursor key, third tab is `.active`')
    assert.ok($thirdTab.attr('aria-selected') === 'true', 'after 2nd right cursor key, third tab has aria-selected="true"')
    assert.ok($thirdTab.attr('tabindex') === '0', 'after 2nd right cursor key, third tab has tabindex="0"')
    /* left cursor key */
    keyDown.which = 37
    $thirdTab[0].dispatchEvent(keyDown)
    assert.ok(document.activeElement !== $thirdTab[0], 'after left cursor key, third tab not focused anymore')
    assert.ok(!$thirdTab.hasClass('active'), 'after left cursor key, third tab not `.active` anymore')
    assert.ok($thirdTab.attr('aria-selected') === 'false', 'after left cursor key, third tab has aria-selected="false"')
    assert.ok($thirdTab.attr('tabindex') === '-1', 'after left cursor key, third tab has tabindex="-1"')
    assert.ok(document.activeElement === $secondTab[0], 'after left cursor key, second tab is focused')
    assert.ok($secondTab.hasClass('active'), 'after left cursor key, second tab is `.active`')
    assert.ok($secondTab.attr('aria-selected') === 'true', 'after left cursor key, second tab has aria-selected="true"')
    assert.ok($secondTab.attr('tabindex') === '0', 'after left cursor key, second tab has tabindex="0"')
    /* up cursor key */
    keyDown.which = 38
    $secondTab[0].dispatchEvent(keyDown)
    assert.ok(document.activeElement === $secondTab[0], 'after up cursor key, second tab is still focused - no change')
    /* down cursor key */
    keyDown.which = 40
    $secondTab[0].dispatchEvent(keyDown)
    assert.ok(document.activeElement === $secondTab[0], 'after down cursor key, second tab is still focused - no change')
    done()
  })

  QUnit.test('should correctly switch tabs in response to up/down cursor keys for vertical tablist and ignore left/right cursor keys', function (assert) {
    assert.expect(27)
    var done = assert.async()

    var tabsHTML = '<ul class="nav nav-tabs" role="tablist" aria-orientation="vertical">' +
        '<li><a class="nav-item active" href="#home" data-toggle="tab" role="tab" tabindex="0" aria-selected="true">Home</a></li>' +
        '<li><a class="nav-item" href="#profile" data-toggle="tab" role="tab" tabindex="-1" aria-selected="false">Profile</a></li>' +
        '<li><a class="nav-item" href="#contact" data-toggle="tab" role="tab" tabindex="-1" aria-selected="false">Contact</a></li>' +
        '</ul>' +
        '<div class="tab-pane show active" id="home" role="tabpanel">...</div>' +
        '<div class="tab-pane" id="profile" role="tabpanel">...</div>' +
        '<div class="tab-pane" id="contact" role="tabpanel">...</div>'
    var $tabs = $(tabsHTML).appendTo('#qunit-fixture')

    var $firstTab = $tabs.find('li:first-child a')
    var $secondTab = $tabs.find('li:nth-child(2) a')
    var $thirdTab = $tabs.find('li:nth-child(3) a')
    $firstTab[0].focus() /* set focus to first tab */
    assert.ok(document.activeElement === $firstTab[0], 'first tab successfully focused')
    /* down cursor key */
    var keyDown = new Event('keydown')
    keyDown.which = 40
    $firstTab[0].dispatchEvent(keyDown)
    assert.ok(document.activeElement !== $firstTab[0], 'after 1st down cursor key, first tab not focused anymore')
    assert.ok(!$firstTab.hasClass('active'), 'after 1st down cursor key, first tab not `.active` anymore')
    assert.ok($firstTab.attr('aria-selected') === 'false', 'after 1st down cursor key, first tab has aria-selected="false"')
    assert.ok($firstTab.attr('tabindex') === '-1', 'after 1st down cursor key, first tab has tabindex="-1"')
    assert.ok(document.activeElement === $secondTab[0], 'after 1st down cursor key, second tab is focused')
    assert.ok($secondTab.hasClass('active'), 'after 1st down cursor key, second tab is `.active`')
    assert.ok($secondTab.attr('aria-selected') === 'true', 'after 1st down cursor key, second tab has aria-selected="true"')
    assert.ok($secondTab.attr('tabindex') === '0', 'after 1st down cursor key, second tab has tabindex="0"')
    /* down cursor key */
    $secondTab[0].dispatchEvent(keyDown)
    assert.ok(document.activeElement !== $secondTab[0], 'after 2nd down cursor key, second tab not focused anymore')
    assert.ok(!$secondTab.hasClass('active'), 'after 2nd down cursor key, second tab not `.active` anymore')
    assert.ok($secondTab.attr('aria-selected') === 'false', 'after 2nd down cursor key, second tab has aria-selected="false"')
    assert.ok($secondTab.attr('tabindex') === '-1', 'after 2nd down cursor key, second tab has tabindex="-1"')
    assert.ok(document.activeElement === $thirdTab[0], 'after 2nd down cursor key, third tab is focused')
    assert.ok($thirdTab.hasClass('active'), 'after 2nd down cursor key, third tab is `.active`')
    assert.ok($thirdTab.attr('aria-selected') === 'true', 'after 2nd down cursor key, third tab has aria-selected="true"')
    assert.ok($thirdTab.attr('tabindex') === '0', 'after 2nd down cursor key, third tab has tabindex="0"')
    /* up cursor key */
    keyDown.which = 38
    $thirdTab[0].dispatchEvent(keyDown)
    assert.ok(document.activeElement !== $thirdTab[0], 'after up cursor key, third tab not focused anymore')
    assert.ok(!$thirdTab.hasClass('active'), 'after  up cursor key, third tab not `.active` anymore')
    assert.ok($thirdTab.attr('aria-selected') === 'false', 'after up cursor key, third tab has aria-selected="false"')
    assert.ok($thirdTab.attr('tabindex') === '-1', 'after up cursor key, third tab has tabindex="-1"')
    assert.ok(document.activeElement === $secondTab[0], 'after up cursor key, second tab is focused')
    assert.ok($secondTab.hasClass('active'), 'after up cursor key, second tab is `.active`')
    assert.ok($secondTab.attr('aria-selected') === 'true', 'after up cursor key, second tab has aria-selected="true"')
    assert.ok($secondTab.attr('tabindex') === '0', 'after up cursor key, second tab has tabindex="0"')
    /* left cursor key */
    keyDown.which = 37
    $secondTab[0].dispatchEvent(keyDown)
    assert.ok(document.activeElement === $secondTab[0], 'after left cursor key, second tab is still focused - no change')
    /* right cursor key */
    keyDown.which = 39
    $secondTab[0].dispatchEvent(keyDown)
    assert.ok(document.activeElement === $secondTab[0], 'after right cursor key, second tab is still focused - no change')
    done()
  })

  QUnit.test('should not switch tabs in response to cursor keys if tab panel still transitioning', function (assert) {
    assert.expect(13)
    var done = assert.async()

    var tabsHTML = '<ul class="nav nav-tabs" role="tablist">' +
        '<li><a class="nav-item active" href="#home" data-toggle="tab" role="tab" tabindex="0" aria-selected="true">Home</a></li>' +
        '<li><a class="nav-item" href="#profile" data-toggle="tab" role="tab" tabindex="-1" aria-selected="false">Profile</a></li>' +
        '<li><a class="nav-item" href="#contact" data-toggle="tab" role="tab" tabindex="-1" aria-selected="false">Contact</a></li>' +
        '</ul>' +
        '<div class="tab-pane fade show active" id="home" role="tabpanel">...</div>' +
        '<div class="tab-pane fade" id="profile" role="tabpanel">...</div>' +
        '<div class="tab-pane fade" id="contact" role="tabpanel">...</div>'
    var $tabs = $(tabsHTML).appendTo('#qunit-fixture')

    var $firstTab = $tabs.find('li:first-child a')
    var $secondTab = $tabs.find('li:nth-child(2) a')
    $firstTab[0].focus() /* set focus to first tab */
    assert.ok(document.activeElement === $firstTab[0], 'first tab successfully focused')
    /* right cursor key */
    var keyDown = new Event('keydown')
    keyDown.which = 39
    $firstTab[0].dispatchEvent(keyDown)
    assert.ok(document.activeElement !== $firstTab[0], 'after 1st right cursor key, first tab not focused anymore')
    assert.ok(!$firstTab.hasClass('active'), 'after 1st right cursor key, first tab not `.active` anymore')
    assert.ok($firstTab.attr('aria-selected') === 'false', 'after 1st right cursor key, first tab has aria-selected="false"')
    assert.ok($firstTab.attr('tabindex') === '-1', 'after 1st right cursor key, first tab has tabindex="-1"')
    assert.ok(document.activeElement === $secondTab[0], 'after 1st right cursor key, second tab is focused')
    assert.ok($secondTab.hasClass('active'), 'after 1st right cursor key, second tab is `.active`')
    assert.ok($secondTab.attr('aria-selected') === 'true', 'after 1st right cursor key, second tab has aria-selected="true"')
    assert.ok($secondTab.attr('tabindex') === '0', 'after 1st right cursor key, second tab has tabindex="0"')
    /* right cursor key - as this is fired so quickly, the tab panel is still transitioning */
    $secondTab[0].dispatchEvent(keyDown)
    assert.ok(document.activeElement === $secondTab[0], 'after 2nd right cursor key, while tab panel still transitioning, second tab is still focused')
    assert.ok($secondTab.hasClass('active'), 'after 2nd right cursor key, while tab panel still transitioning, second tab is still `.active`')
    assert.ok($secondTab.attr('aria-selected') === 'true', 'after 2nd right cursor key, while tab panel still transitioning, second tab still has aria-selected="true"')
    assert.ok($secondTab.attr('tabindex') === '0', 'after 2nd right cursor key, while tab panel still transitioning, second tab still has tabindex="0"')
    done()
  })

  QUnit.test('should return the version', function (assert) {
    assert.expect(1)
    assert.strictEqual(typeof Tab.VERSION, 'string')
  })
})
