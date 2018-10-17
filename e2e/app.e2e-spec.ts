import { ProyectPage } from './app.po';

describe('proyect App', function() {
  let page: ProyectPage;

  beforeEach(() => {
    page = new ProyectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
