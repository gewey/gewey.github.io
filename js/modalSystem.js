/**
 * Modal System - Global dialog/modal management
 */

const ModalSystem = {
  activeModals: [],

  init() {
    // Create modal container
    const container = document.createElement('div');
    container.id = 'modal-container';
    document.body.appendChild(container);
  },

  show(id, content, options = {}) {
    const {
      title = 'Dialog',
      width = '500px',
      closable = true,
      backdrop = true,
      onClose = null
    } = options;

    const backdrop_el = document.createElement('div');
    backdrop_el.className = 'modal-backdrop';
    if (!backdrop) backdrop_el.style.display = 'none';

    const modal = document.createElement('div');
    modal.className = 'modal animate__animated animate__fadeIn';
    modal.id = `modal-${id}`;
    modal.style.width = width;
    
    let headerHTML = '';
    if (title) {
      headerHTML = `
        <div class="modal-header">
          <h2>${title}</h2>
          ${closable ? '<button class="modal-close">&times;</button>' : ''}
        </div>
      `;
    }

    modal.innerHTML = `
      ${headerHTML}
      <div class="modal-content">
        ${content}
      </div>
    `;

    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close(id));
    }

    backdrop_el.addEventListener('click', () => {
      if (backdrop) this.close(id);
    });

    const container = document.getElementById('modal-container') || document.body;
    container.appendChild(backdrop_el);
    container.appendChild(modal);

    this.activeModals.push({ id, modal, backdrop: backdrop_el, onClose });

    // Keyboard close on Escape
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        this.close(id);
        document.removeEventListener('keydown', escapeHandler);
      }
    };
    document.addEventListener('keydown', escapeHandler);

    // Trigger animation
    setTimeout(() => modal.classList.add('animate__slideInUp'), 10);

    return modal;
  },

  close(id) {
    const index = this.activeModals.findIndex(m => m.id === id);
    if (index === -1) return;

    const { modal, backdrop, onClose } = this.activeModals[index];
    
    modal.classList.remove('animate__slideInUp');
    modal.classList.add('animate__slideOutDown');

    setTimeout(() => {
      modal.remove();
      backdrop.remove();
      this.activeModals.splice(index, 1);
      if (onClose) onClose();
    }, 300);
  },

  closeAll() {
    [...this.activeModals].forEach(m => this.close(m.id));
  },

  confirm(message, onConfirm, onCancel = null) {
    const content = `
      <p>${message}</p>
      <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: flex-end;">
        <button class="btn-cancel">Cancel</button>
        <button class="btn-confirm">Confirm</button>
      </div>
    `;

    const modal = this.show('confirm', content, { title: 'Confirm', width: '400px' });
    
    modal.querySelector('.btn-cancel').onclick = () => {
      this.close('confirm');
      if (onCancel) onCancel();
    };

    modal.querySelector('.btn-confirm').onclick = () => {
      this.close('confirm');
      onConfirm();
    };
  },

  alert(message, onClose = null) {
    const content = `
      <p>${message}</p>
      <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
        <button class="btn-ok">OK</button>
      </div>
    `;

    const modal = this.show('alert', content, { title: 'Alert', width: '400px' });
    
    modal.querySelector('.btn-ok').onclick = () => {
      this.close('alert');
      if (onClose) onClose();
    };
  },

  prompt(message, defaultValue = '', onSubmit, onCancel = null) {
    const content = `
      <p>${message}</p>
      <input type="text" id="prompt-input" class="prompt-input" value="${defaultValue}" placeholder="Enter text...">
      <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: flex-end;">
        <button class="btn-cancel">Cancel</button>
        <button class="btn-submit">Submit</button>
      </div>
    `;

    const modal = this.show('prompt', content, { title: 'Input', width: '400px' });
    const input = modal.querySelector('#prompt-input');
    
    setTimeout(() => input.focus(), 100);

    modal.querySelector('.btn-cancel').onclick = () => {
      this.close('prompt');
      if (onCancel) onCancel();
    };

    const submitHandler = () => {
      this.close('prompt');
      onSubmit(input.value);
    };

    modal.querySelector('.btn-submit').onclick = submitHandler;
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') submitHandler();
    });
  }
};

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ModalSystem.init());
} else {
  ModalSystem.init();
}
