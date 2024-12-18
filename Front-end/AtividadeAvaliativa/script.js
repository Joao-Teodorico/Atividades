document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('consultoria-form');
    const confirmationMessage = document.getElementById('confirmation-message');


    form.addEventListener('submit', async (e) => {
        e.preventDefault();


        const formData = new FormData(form);
        const data = {
            nome: formData.get('nome'),
            email: formData.get('email'),
            mensagem: formData.get('mensagem')
        };


        try {
            const response = await fetch('/api/formulario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });


            if (response.ok) {
                confirmationMessage.textContent = 'Formulário enviado com sucesso!';
                form.reset();
            } else {
                confirmationMessage.textContent = 'Erro ao enviar o formulário. Tente novamente.';
            }
        } catch (error) {
            confirmationMessage.textContent = 'Erro ao conectar ao servidor. Tente novamente.';
        }
    });
});


