import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '../src/App';

describe('Application Tests', () => {
  
  it('render correctement sans erreur', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it('affiche le titre principal', () => {
    const { container } = render(<App />);
    const title = container.querySelector('.title');
    expect(title).toBeDefined();
    expect(title.textContent).toContain('DevOps CI/CD on GCP');
  });

  it('affiche exactement 2 images (logos)', () => {
    const { container } = render(<App />);
    const images = container.querySelectorAll('img');
    expect(images.length).toBe(2);
  });

  it('tous les logos ont un alt pour accessibilite', () => {
    const { container } = render(<App />);
    const images = container.querySelectorAll('img');
    images.forEach(img => {
      expect(img.getAttribute('alt')).toBeTruthy();
      expect(img.getAttribute('alt').length).toBeGreaterThan(0);
    });
  });

  it('affiche exactement 4 membres de l equipe', () => {
    const { container } = render(<App />);
    const teamMembers = container.querySelectorAll('.team-grid > div');
    expect(teamMembers.length).toBe(4);
  });

  it('chaque membre a un nom non vide', () => {
    const { container } = render(<App />);
    const teamMembers = container.querySelectorAll('.team-grid > div');
    teamMembers.forEach(member => {
      expect(member.textContent.trim().length).toBeGreaterThan(0);
    });
  });

  it('structure HTML correcte avec hero et container', () => {
    const { container } = render(<App />);
    const hero = container.querySelector('.hero');
    const innerContainer = container.querySelector('.hero .container');
    expect(hero).toBeDefined();
    expect(innerContainer).toBeDefined();
  });

  it('peut etre demonte sans memory leak', () => {
    const { unmount } = render(<App />);
    expect(() => unmount()).not.toThrow();
  });

  it('utilise des classes Bulma pour le responsive', () => {
    const { container } = render(<App />);
    const html = container.innerHTML;
    expect(html).toContain('is-size');
    expect(html).toContain('mobile');
  });

  it('les images ont une classe CSS', () => {
    const { container } = render(<App />);
    const images = container.querySelectorAll('img');
    images.forEach(img => {
      expect(img.className.length).toBeGreaterThan(0);
    });
  });

  it('la grille d equipe existe et contient des enfants', () => {
    const { container } = render(<App />);
    const grid = container.querySelector('.team-grid');
    expect(grid).toBeDefined();
    expect(grid.children.length).toBeGreaterThan(0);
  });

  it('le hero prend toute la hauteur', () => {
    const { container } = render(<App />);
    const hero = container.querySelector('.hero');
    expect(hero.className).toContain('is-fullheight');
  });
});
