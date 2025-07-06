// Menu fixo com efeito ao rolar
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if(window.scrollY > 30) {
    header.style.boxShadow = '0 4px 16px #ccc';
  } else {
    header.style.boxShadow = '0 2px 8px #eee';
  }
});


// Filtro da galeria e efeito de zoom/modal na galeria (compatível com Bootstrap)
document.addEventListener('DOMContentLoaded', function() {
  const filtros = document.querySelectorAll('.filtros button');
  const obras = document.querySelectorAll('.obra');

  function mostrarObras(cat) {
    // Primeiro remove a classe d-none de todas as obras para garantir que todas sejam exibidas
    obras.forEach(obra => {
      obra.classList.remove('d-none');
    });
    // Depois aplica o filtro baseado na categoria selecionada
    obras.forEach(obra => {
      obra.onclick = null;
      if(cat === 'todas' || obra.getAttribute('data-categoria') === cat) {
        obra.classList.remove('d-none');
      } else {
        obra.classList.add('d-none');
      }
    });
    bindModal();
  }

  if(filtros.length) {
    filtros.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-categoria');
        mostrarObras(cat);
      });
    });
    mostrarObras('todas');
  }

  // Bind do modal para exibir imagem ampliada ao clicar na obra
  function bindModal() {
    document.querySelectorAll('.obra').forEach(obra => {
      obra.onclick = null;
      if (obra.classList.contains('d-none')) return;
      obra.addEventListener('click', function() {
        const img = obra.querySelector('img');
        if (!img) return;
        const imgSrc = img.src;
        // Remove qualquer modal existente antes de criar outro
        document.querySelectorAll('.modal-img').forEach(m => m.remove());
        const modal = document.createElement('div');
        modal.className = 'modal-img';
        modal.innerHTML = `
          <div class='modal-bg' style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0008;z-index:1000;"></div>
          <img src='${imgSrc}' style='max-width:90vw; max-height:80vh; border-radius:8px; box-shadow:0 4px 32px #0008; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); z-index:1001; cursor:pointer;'>
          <button class='modal-close' style="position:fixed;top:30px;right:40px;z-index:1002;font-size:2rem;background:none;border:none;color:#fff;cursor:pointer;">&times;</button>
        `;
        document.body.appendChild(modal);
        function removeModal() {
          if (modal.parentNode) {
            modal.remove();
            document.removeEventListener('keydown', escListener);
          }
        }
        // Fecha ao clicar no fundo OU na imagem OU no botão (1 clique)
        // Fecha ao clicar no fundo opaco ou no X
        // Remove qualquer propagação para garantir apenas 1 clique
        modal.querySelector('.modal-bg').onclick = function(e) {
          e.stopPropagation();
          if (modal.parentNode) {
            removeModal();
          }
        };
        modal.querySelector('.modal-close').onclick = function(e) {
          e.stopPropagation();
          if (modal.parentNode) {
            removeModal();
          }
        };
        // Não fecha ao clicar na imagem grande
        modal.querySelector('img').onclick = (e) => { e.stopPropagation(); };
        function escListener(e) { if(e.key === 'Escape') removeModal(); }
        setTimeout(() => {
          document.addEventListener('keydown', escListener, { once: true });
        }, 0);
      });
    });
  }
  bindModal();
});

// Efeito fade-in nos elementos ao rolar (corrigido para funcionar após filtro)
function aplicarFadeIn() {
  const fadeEls = document.querySelectorAll('.obra');
  fadeEls.forEach(el => {
    el.style.opacity = 1;
    el.style.transform = 'none';
    el.style.transition = 'opacity 0.7s, transform 0.7s';
  });
}
document.addEventListener('DOMContentLoaded', aplicarFadeIn);
// Reaplica o efeito fade-in após filtro
document.addEventListener('DOMContentLoaded', function() {
  const filtros = document.querySelectorAll('.filtros button');
  filtros.forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(aplicarFadeIn, 10);
    });
  });
});
