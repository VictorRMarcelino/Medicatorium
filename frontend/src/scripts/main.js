document.addEventListener('DOMContentLoaded', function() {
    // Navegação entre seções
    const navItems = document.querySelectorAll('.main-nav li');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
            
            // Atualizar navegação ativa
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Configurar modal de medicamento
    const medicationModal = {
        element: document.getElementById('medication-modal'),
        form: document.getElementById('medication-form'),
        open: function() {
            this.element.classList.add('active');
        },
        close: function() {
            this.element.classList.remove('active');
            this.form.reset();
        }
    };
    
    // Botões para abrir modal
    document.getElementById('add-medication').addEventListener('click', () => {
        document.getElementById('modal-title').textContent = 'Adicionar Medicamento';
        medicationModal.open();
    });
    
    document.getElementById('add-first-medication')?.addEventListener('click', () => {
        document.getElementById('modal-title').textContent = 'Adicionar Medicamento';
        medicationModal.open();
    });
    
    // Fechar modal
    document.querySelector('.modal-close').addEventListener('click', () => medicationModal.close());
    document.getElementById('modal-cancel').addEventListener('click', () => medicationModal.close());
    
    function showSection(sectionId) {
        // Esconder todas as seções
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Mostrar seção selecionada
        const section = document.getElementById(`${sectionId}-section`);
        if (section) {
            section.classList.add('active');
            document.getElementById('section-title').textContent = 
                document.querySelector(`.main-nav li[data-section="${sectionId}"] span`).textContent;
            
            // Carregar conteúdo se necessário
            if (sectionId === 'medications') {
                loadMedications();
            }
        }
    }
    
    // Carregar dados iniciais
    loadDashboard();
    
    function loadDashboard() {
        const medications = JSON.parse(localStorage.getItem('medications')) || [];
        document.getElementById('total-medications').textContent = medications.length;
        
        if (medications.length > 0) {
            const nextMed = findNextMedication(medications);
            document.getElementById('next-medication-time').textContent = nextMed.time;
            
            const nextMedElement = document.getElementById('next-medication');
            nextMedElement.innerHTML = `
                <div class="medication-info">
                    <h4>${nextMed.name}</h4>
                    <p class="medication-dose">${nextMed.dose}</p>
                    <div class="medication-time">
                        <i class="fas fa-clock"></i>
                        <span>${formatTime(nextMed.time)}</span>
                    </div>
                    ${nextMed.notes ? `<p class="medication-notes">${nextMed.notes}</p>` : ''}
                    <button class="btn-primary btn-block" id="take-medication" data-id="${nextMed.id}">
                        <i class="fas fa-check"></i> Marcar como tomado
                    </button>
                </div>
            `;
            
            document.getElementById('take-medication')?.addEventListener('click', function() {
                takeMedication(this.getAttribute('data-id'));
            });
        }
    }
    
    function findNextMedication(medications) {
        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
        
        return medications.sort((a, b) => {
            const [aHours, aMins] = a.time.split(':').map(Number);
            const [bHours, bMins] = b.time.split(':').map(Number);
            
            const aTotal = aHours * 60 + aMins;
            const bTotal = bHours * 60 + bMins;
            const currentTotal = currentHours * 60 + currentMinutes;
            
            if (aTotal >= currentTotal && bTotal >= currentTotal) return aTotal - bTotal;
            if (aTotal >= currentTotal) return -1;
            if (bTotal >= currentTotal) return 1;
            return aTotal - bTotal;
        })[0];
    }
    
    function formatTime(timeStr) {
        const [hours, minutes] = timeStr.split(':');
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    }
    
    // Formulário de medicamento
    document.getElementById('modal-confirm').addEventListener('click', function() {
        const name = document.getElementById('med-name').value;
        const dose = document.getElementById('med-dose').value;
        const unit = document.getElementById('med-unit').value;
        const time = document.getElementById('med-time').value;
        const frequency = document.getElementById('med-frequency').value;
        const notes = document.getElementById('med-notes').value;
        
        const medication = {
            id: Date.now(),
            name,
            dose: `${dose} ${unit}`,
            time,
            frequency,
            notes,
            createdAt: new Date().toISOString()
        };
        
        let medications = JSON.parse(localStorage.getItem('medications')) || [];
        medications.push(medication);
        localStorage.setItem('medications', JSON.stringify(medications));
        
        medicationModal.close();
        loadDashboard();
        loadMedications();
    });
    
    function loadMedications() {
        const medications = JSON.parse(localStorage.getItem('medications')) || [];
        const listContainer = document.getElementById('medications-list');
        
        if (medications.length === 0) {
            listContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-box-open"></i>
                    <p>Nenhum medicamento cadastrado</p>
                    <button class="btn-primary" id="add-first-medication">
                        <i class="fas fa-plus"></i> Adicionar Medicamento
                    </button>
                </div>
            `;
            
            document.getElementById('add-first-medication').addEventListener('click', () => {
                document.getElementById('modal-title').textContent = 'Adicionar Medicamento';
                medicationModal.open();
            });
            
            return;
        }
        
        listContainer.innerHTML = '';
        
        medications.forEach(med => {
            const medItem = document.createElement('div');
            medItem.className = 'med-item';
            medItem.innerHTML = `
                <div class="med-info">
                    <h4>${med.name}</h4>
                    <p>${med.dose} • ${formatTime(med.time)}</p>
                    ${med.notes ? `<small>${med.notes}</small>` : ''}
                </div>
                <div class="med-actions">
                    <button class="action-btn edit-btn" data-id="${med.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" data-id="${med.id}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            
            listContainer.appendChild(medItem);
        });
        
        // Configurar botões de ação
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                editMedication(this.getAttribute('data-id'));
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                deleteMedication(this.getAttribute('data-id'));
            });
        });
        
        // Configurar busca
        document.getElementById('medication-search').addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const items = document.querySelectorAll('.med-item');
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(searchTerm) ? 'flex' : 'none';
            });
        });
    }
    
    function editMedication(id) {
        let medications = JSON.parse(localStorage.getItem('medications')) || [];
        const med = medications.find(m => m.id === Number(id));
        
        if (med) {
            document.getElementById('modal-title').textContent = 'Editar Medicamento';
            
            // Preencher formulário
            document.getElementById('med-name').value = med.name;
            
            const doseMatch = med.dose.match(/(\d+)\s(.+)/);
            if (doseMatch) {
                document.getElementById('med-dose').value = doseMatch[1];
                document.getElementById('med-unit').value = doseMatch[2];
            }
            
            document.getElementById('med-time').value = med.time;
            document.getElementById('med-frequency').value = med.frequency;
            document.getElementById('med-notes').value = med.notes || '';
            
            // Remover o medicamento antigo
            medications = medications.filter(m => m.id !== Number(id));
            localStorage.setItem('medications', JSON.stringify(medications));
            
            medicationModal.open();
        }
    }
    
    function deleteMedication(id) {
        let medications = JSON.parse(localStorage.getItem('medications')) || [];
        medications = medications.filter(m => m.id !== Number(id));
        localStorage.setItem('medications', JSON.stringify(medications));
        
        loadDashboard();
        loadMedications();
    }
    
    function takeMedication(id) {
        // Implementar histórico de medicamentos tomados
        alert(`Medicamento ${id} marcado como tomado!`);
        loadDashboard();
    }
});