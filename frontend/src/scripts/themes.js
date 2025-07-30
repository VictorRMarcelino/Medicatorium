document.addEventListener('DOMContentLoaded', function() {
    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme') || 'red';
    setTheme(savedTheme);
    
    // Configurar seletor de tema
    const themeOptions = document.querySelectorAll('.theme-option');
    const themeMenu = document.querySelector('.theme-menu');
    
    // Manter menu aberto quando interagir com ele
    themeMenu.addEventListener('mouseenter', function() {
        this.querySelector('.theme-dropdown').style.display = 'block';
    });
    
    themeMenu.addEventListener('mouseleave', function() {
        this.querySelector('.theme-dropdown').style.display = 'none';
    });
    
    themeOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const theme = this.getAttribute('data-theme');
            setTheme(theme);
            localStorage.setItem('theme', theme);
        });
    });
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Atualizar visualização ativa
        themeOptions.forEach(opt => {
            opt.classList.remove('active');
            if (opt.getAttribute('data-theme') === theme) {
                opt.classList.add('active');
            }
        });
    }
});