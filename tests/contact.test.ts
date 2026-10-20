import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { buildWhatsAppMessage, validateContact } from '../src/lib/contact.ts';

const valid = {
  name: 'Maria Souza',
  email: 'maria@empresa.com.br',
  phone: '',
  interest: '',
  budget: '',
  message: 'Precisamos de um portal para clientes acompanharem pedidos.',
};

describe('validateContact', () => {
  it('aceita o mínimo necessário: nome, e-mail e mensagem', () => {
    const result = validateContact(valid);
    assert.equal(result.ok, true);
  });

  it('remove espaços extras dos campos', () => {
    const result = validateContact({ ...valid, name: '  Maria  ', email: ' maria@empresa.com.br ' });
    assert.ok(result.ok);
    assert.equal(result.data.name, 'Maria');
    assert.equal(result.data.email, 'maria@empresa.com.br');
  });

  it('aceita telefone e opções válidas', () => {
    const result = validateContact({
      ...valid,
      phone: '(11) 95976-6136',
      interest: 'sistemas',
      budget: 'nao-definido',
    });
    assert.equal(result.ok, true);
  });

  it('indica cada campo obrigatório ausente', () => {
    const result = validateContact({});
    assert.equal(result.ok, false);
    assert.ok(!result.ok);
    assert.deepEqual(Object.keys(result.errors).sort(), ['email', 'message', 'name']);
  });

  it('rejeita tipos inesperados', () => {
    const result = validateContact({ ...valid, name: 123, message: ['x'] });
    assert.ok(!result.ok);
    assert.ok(result.errors.name);
    assert.ok(result.errors.message);
  });

  it('rejeita e-mail, telefone e opções inválidos', () => {
    const result = validateContact({
      ...valid,
      email: 'maria@',
      phone: '1234',
      interest: 'ecommerce',
      budget: '1-milhao',
    });
    assert.ok(!result.ok);
    assert.deepEqual(Object.keys(result.errors).sort(), ['budget', 'email', 'interest', 'phone']);
  });

  it('aplica limites de tamanho', () => {
    const result = validateContact({ ...valid, name: 'a'.repeat(101), message: 'x'.repeat(4001) });
    assert.ok(!result.ok);
    assert.ok(result.errors.name);
    assert.ok(result.errors.message);
  });

  it('não aceita quebra de linha no nome', () => {
    const result = validateContact({ ...valid, name: 'Maria\nBcc: x@y.com' });
    assert.ok(!result.ok);
    assert.ok(result.errors.name);
  });

  it('rejeita payloads que não são objetos', () => {
    assert.equal(validateContact(null).ok, false);
    assert.equal(validateContact('texto').ok, false);
    assert.equal(validateContact([valid]).ok, false);
  });
});

describe('buildWhatsAppMessage', () => {
  it('usa uma saudação pronta quando nada foi preenchido', () => {
    const message = buildWhatsAppMessage();
    assert.equal(message, 'Olá! Vim pelo site da CarvaCode e gostaria de conversar sobre um projeto.');
  });

  it('inclui somente o que foi preenchido, com textos legíveis', () => {
    const message = buildWhatsAppMessage({ name: 'Maria', interest: 'aplicativos', budget: '5k-15k' });
    assert.match(message, /Meu nome é Maria\./);
    assert.match(message, /Tenho interesse em: Aplicativo\./);
    assert.match(message, /Orçamento estimado: R\$ 5\.000 a R\$ 15\.000\./);
    assert.doesNotMatch(message, /Sobre o projeto/);
  });

  it('nunca contém marcadores nem valores internos', () => {
    const samples = [
      buildWhatsAppMessage({}),
      buildWhatsAppMessage({ interest: 'integracoes' }),
      buildWhatsAppMessage({ budget: '50k+' }),
      buildWhatsAppMessage({ name: '  ', message: '  ' }),
    ];
    for (const message of samples) {
      assert.doesNotMatch(message, /\[|\]/);
      assert.doesNotMatch(message, /integracoes|50k\+|undefined|null/);
    }
  });

  it('resume mensagens longas', () => {
    const message = buildWhatsAppMessage({ message: 'a'.repeat(2000) });
    assert.ok(message.length < 700);
    assert.ok(message.endsWith('…'));
  });
});
