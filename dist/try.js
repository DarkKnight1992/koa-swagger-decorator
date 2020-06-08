/* eslint-disable */
function seriesLoadScriptsCss(scripts, callback) {
  if (typeof scripts !== 'object') var scripts = [scripts];
  const HEAD =
    document.getElementsByTagName('head').item(0) || document.documentElement;
  var s = new Array(),
    last = scripts.length - 1,
    recursiveLoad = function(i) {
      s[i] = document.createElement('script');
      s[i].setAttribute('type', 'text/javascript');
      s[i].onload = s[i].onreadystatechange = function() {
        // Attach handlers for all browsers
        if (
          !0 ||
          this.readyState == 'loaded' ||
          this.readyState == 'complete'
        ) {
          this.onload = this.onreadystatechange = null;
          this.parentNode.removeChild(this);
          if (i != last) recursiveLoad(i + 1);
          else if (typeof callback === 'function') callback();
        }
      };
      s[i].setAttribute('src', scripts[i]);
      HEAD.appendChild(s[i]);
    };
  recursiveLoad(0);
}
function loadSource(arr) {
  let i = 0,
    len = arr.length,
    fragment = document.createDocumentFragment();
  for (; i < len; i++) {
    const ext = arr[i].match(/\.[^\.]+$/)[0];
    switch (ext) {
      case '.css':
        var link;
        if (typeof link === 'undefined') {
          link = document.createElement('link');
          link.rel = 'stylesheet';
          link.type = 'text/css';
        }
        link.href = arr[i];
        fragment.appendChild(link);
        break;
      default:
        var script;
        if (typeof script === 'undefined') {
          script = document.createElement('script');
          script.type = 'text/javascript';
        }
        script.src = arr[i];
        fragment.appendChild(script);
        break;
    }
  }
  document.getElementsByTagName('head')[0].appendChild(fragment);
}
function debounce(fn, wait) {
  let timer = null;
  return function() {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, wait);
  };
}
function getAbsolutePosition(domObj) {
  if (!domObj) return null;
  let w = domObj.offsetWidth,
    h = domObj.offsetHeight;
  let t, l;
  for (
    t = domObj.offsetTop, l = domObj.offsetLeft;
    (domObj = domObj.offsetParent);

  ) {
    t += domObj.offsetTop;
    l += domObj.offsetLeft;
  }
  const r = document.body.offsetWidth - w - l;
  const b = document.body.offsetHeight - h - t;

  return {
    width: w,
    height: h,
    top: t,
    left: l,
    right: r,
    bottom: b
  };
}

function initTry(userCfg) {
  seriesLoadScriptsCss(
    [
      '//cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js',
      '//cdn.jsdelivr.net/npm/jquery.scrollto@2.1.2/jquery.scrollTo.min.js',
      '//unpkg.com/swagger-ui-dist@3.25.1/swagger-ui-bundle.js'
    ],
    () => {
      const cfg = {
        // petstore.swagger.io/v2/swagger.json
        openApi: 'httpbin.org/spec.json',
        ...userCfg
      };
      if (cfg.onlySwagger) {
        initSwagger(cfg);
      } else {
        initTryOk(cfg);
      }
    }
  );
}

function initSwagger(cfg) {
  $('head').append(`
  <style>
    body .swagger-ui .wrapper {
      padding: 0;
    }
    body .swagger-ui .opblock.opblock-get .opblock-summary {
      cursor: not-allowed;
      pointer-events: none;
    }
    body {
      position: relative;
    }
    @media print, screen and (max-width: 85rem) {
      .dtUibw {
        padding: 4px;
      }
    }
    .swaggerBox {
      border-radius: 4px;
      background-color: #fff;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    .hide {
      visibility: hidden;
      cursor: none;
      width: 0;
      height: 0;
    }
    .show {
      visibility: visible;
      cursor: initial;
    }
    .tryBtn {
      margin-right: 10px;
      background-color: #fff;
    }
  </style>
`);
  // dom
  $('body').append(`
    <div class="swaggerBox">
      <div id="swagger-ui"></div>
    </div>
  `);
  // swagger-ui.css
  $('head').append(
    // '<link href="//unpkg.com/swagger-ui-dist@3.25.1/swagger-ui.css" rel="stylesheet" type="text/css" />'
    '<link href="//unpkg.com/swagger-ui-dist@3.21.0/swagger-ui.css" rel="stylesheet" type="text/css" />'
  );
  SwaggerUIBundle({
    url: cfg.openApi,
    dom_id: '#swagger-ui',
    onComplete: () => {
      trySwagger(cfg);
    }
  });
}

function initTryOk(cfg) {
  // reset swagger-ui css

  const openApi = cfg.openApi;
  Redoc.init(
    openApi,
    {
      enableConsole: true
      // scrollYOffset: 50
    },
    document.getElementById('redoc-container'),
    () => {
      initSwagger(cfg);
      $('.swaggerBox').addClass('hide');
    }
  );
}

function trySwagger(cfg) {
  cfg = {
    tryText: 'try',
    trySwaggerInApi: true,
    ...cfg
  };

  $('.http-verb').before(`
    <button class="tryBtn try-out__btn">${cfg.tryText}</button>
  `);
  $('.tryBtn').click(function(event) {
    event.stopPropagation();
    const $tryBtn = $(this);
    $('.swaggerShadow').remove();
    const $operation = $tryBtn.parents('[data-section-id]');
    if ($operation.hasClass('try') === true) {
      $('.swaggerBox')
        .addClass('hide')
        .removeClass('show');
      $operation.removeClass('try');
      return false;
    }
    $('[data-section-id]').removeClass('try');
    $operation.addClass('try');

    $('.try>div>div:nth-child(2)').addClass('apiBlock');
    $('.try .apiBlock>div:nth-child(1)').addClass('fullApiBox');
    $('.try .apiBlock>div>div:nth-child(1)').addClass('fullApi');
    const appendSwaggerShadow = () =>
      $('.try .fullApiBox').append('<div class="swaggerShadow"></div>');
    if (cfg.trySwaggerInApi === true) {
      appendSwaggerShadow();
    } else {
      const requestSel = '.try .apiBlock h3';
      $(requestSel)
        .parent()
        .addClass('reqBox');
      if (
        $(requestSel).length &&
        $(requestSel)
          .text()
          .includes('Request')
      ) {
        $('.try .reqBox').append('<div class="swaggerShadow"></div>');
      } else {
        appendSwaggerShadow();
      }
    }

    const fullApi = $('.try .fullApi')
      .text()
      .replace(cfg.tryText, '')
      .trim();
    const [, method, api] = fullApi.match(/(\w+)(.*)/);

    let pos = {};
    pos = getAbsolutePosition($('.try .swaggerShadow')[0]);
    pos = Object.keys(pos).reduce((prev, cur, index) => {
      const val = pos[cur];
      return {
        ...prev,
        [cur]:
          typeof val === 'number' ? (val > 0 ? `${val}px` : undefined) : val
      };
    }, {});

    let oldHeight = pos.height ? `${pos.height}` : undefined;

    const getSwaggerBoxHeight = () =>
      `${getAbsolutePosition($('.swaggerBox')[0]).height}px`;
    $('.swaggerBox')
      .css({
        left: `${pos.left}`,
        top: `${pos.top}`,
        width: `${pos.width}`,
        height: oldHeight,
        position: 'absolute',
        zIndex: 1,
        background: '#fff',
        overflow: 'hidden'
      })
      .removeClass('hide')
      .addClass('show');

    $('.swaggerShadow').css({
      // height: getSwaggerBoxHeight()
    });

    const selStr = `.opblock-summary-${method} [data-path="${api}"]`;
    const $swaggerApiDom = $(selStr);
    const $opblock = $swaggerApiDom.parents('.opblock');
    if ($opblock.hasClass('open') === false) {
      $swaggerApiDom.click();
    }
    $opblock.addClass('open');
    const domChange =
      'DOMAttrModified DOMAttributeNameChanged DOMCharacterDataModified DOMElementNameChanged DOMNodeInserted DOMNodeInsertedIntoDocument DOMNodeRemoved DOMNodeRemovedFromDocument DOMSubtreeModified';
    $('.opblock').off(domChange);
    function changeFn(force) {
      const pos = getAbsolutePosition($opblock[0]);
      if (pos.height === 0) {
        return false;
      }
      const newHeight = `${pos.height}px`;
      if (oldHeight !== newHeight) {
        $('.swaggerBox').scrollTo($swaggerApiDom.parent());
        $('.swaggerBox').css({
          height: newHeight
        });
        // $('.swaggerShadow').css({
        //   height: getSwaggerBoxHeight()
        // });
        oldHeight = newHeight;
      }
    }
    setTimeout(changeFn(true), 500);
    setTimeout(() => {
      changeFn(true);
    });
    $opblock.on(domChange, debounce(changeFn, 100));
  });

  $(window).resize(
    debounce(() => {
      $('.swaggerBox')
        .addClass('hide')
        .removeClass('show')
        .css({ left: 0, top: 0 });
      $('[data-section-id^="operation/"]').removeClass('try');
    }, 500)
  );
}
