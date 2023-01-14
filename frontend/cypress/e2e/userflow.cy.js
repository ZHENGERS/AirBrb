describe('user happy path', () => {
  it('should navigate to the home screen succesfully', () => {
    cy.visit('localhost:3000/');
    cy.url().should('include', 'localhost:3000');
  })
  it('should navigate to the login screen succesfully', () => {
    cy.get(`[data-cy = "account-button"]`).click();
    cy.url().should('include', 'localhost:3000/login');
  })
  // it('should login succesfully', () => {
  //   cy.get(`[data-cy = "login_email"]`).click().type('t');
  //   cy.get(`[data-cy = "login_password"]`).click().type('t');
  //   cy.get('button[name="submit_login"]').click();
  //   cy.url().should('include', 'localhost:3000/dashboard');
  // })
  it('should register succesfully', () => {
    cy.get('[id=create_account]').click();
    cy.get(`[data-cy = "name_field"]`).click().type('1');
    cy.get(`[data-cy = "email_field"]`).click().type('1');
    cy.get(`[data-cy = "password_field"]`).click().type('1');
    cy.get(`[data-cy = "confirm_password_field"]`).click().type('1');
    cy.get('button[name="conf_register"]').click();
    cy.url().should('include', 'localhost:3000/dashboard');
  })
  it('should create a new listing succesfully', () => {
    cy.get(`[data-cy = "my_listings_button"]`).click();
    cy.get('button[name="create_listing"]').click();
    cy.get(`[data-cy = "listing_title"]`).click().type('bet house ever');
    cy.get(`[data-cy = "listing_address"]`).click().type('4 high street');
    cy.get(`[data-cy = "listing_price"]`).click().type('50');
    cy.get(`[data-cy = "sel_property_type"]`).click();
    cy.get(`[data-cy = "property_type1"]`).click();
    cy.get(`[data-cy = "video_field"]`).click().type('https://youtu.be/wAaMxpOEOGE');
    cy.get(`[data-cy = "submit_listing"]`).click();
  })
  it('should update the title and thumbnail of a listing succesfully', () => {
    cy.get(`[data-cy = "account-button"]`).click();
    cy.get(`[data-cy = "login_email"]`).click().type('t');
    cy.get(`[data-cy = "login_password"]`).click().type('t');
    cy.get('button[name="submit_login"]').click();
    cy.get(`[data-cy = "my_listings_button"]`).click();
    cy.wait(3000);
    cy.get(`[data-cy = "edit-0"]`).click();
    cy.get(`[data-cy = "edit_listing_title"]`).click().clear().type('bet house ever');
    cy.get(`[data-cy = "video_field"]`).click().type('https://www.youtube.com/watch?v=qwIjKTrhPjg');
    cy.get(`[data-cy = "save_changes_but"]`).click();
  })
  it('should publish a listing succesfully', () => {
    cy.get(`[data-cy = "logout_button"]`).click();
    cy.get(`[data-cy = "login_email"]`).click().type('t');
    cy.get(`[data-cy = "login_password"]`).click().type('t');
    cy.get('button[name="submit_login"]').click();
    cy.get(`[data-cy = "my_listings_button"]`).click();
    cy.wait(2000);
    cy.get(`[data-cy = "publish_button-0"]`).click();
    cy.get(`[data-cy = "start_date-0"]`).click().type('2022-12-01');
    cy.get(`[data-cy = "end_date-0"]`).click().type('2022-12-10');
    cy.get(`[data-cy = "conf_publish_button-0"]`).click();
  })
  it('should unpublish a listing succesfully', () => {
    cy.get(`[data-cy = "logout_button"]`).click();
    cy.get(`[data-cy = "login_email"]`).click().type('t');
    cy.get(`[data-cy = "login_password"]`).click().type('t');
    cy.get('button[name="submit_login"]').click();
    cy.get(`[data-cy = "my_listings_button"]`).click();
    cy.wait(2000);
    cy.get(`[data-cy = "unpublish_button-0"]`).click();
    cy.get(`[data-cy = "conf_unpublish_button-0"]`).click();
  })
  it('should book succesfully', () => {
    cy.get(`[data-cy = "logout_button"]`).click();
    cy.get(`[data-cy = "login_email"]`).click().type('y');
    cy.get(`[data-cy = "login_password"]`).click().type('y');
    cy.get('button[name="submit_login"]').click();
    cy.get(`[data-cy = "explore_button_sec"]`).click();
    cy.get(`[data-cy = "view_button-0"]`).click();
    cy.get(`[data-cy = "book_startdate"]`).click().type('2022-11-18');
    cy.get(`[data-cy = "book_enddate"]`).click().type('2022-11-22');
    cy.get(`[data-cy = "book_now_button"]`).click();
    cy.get(`[data-cy = "yes_conf_book"]`).click();
  })
  it('should logout and login succesfully', () => {
    cy.get(`[data-cy = "logout_button"]`).click();
    cy.get(`[data-cy = "login_email"]`).click().type('y');
    cy.get(`[data-cy = "login_password"]`).click().type('y');
    cy.get('button[name="submit_login"]').click();
  })
})