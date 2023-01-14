describe('user happy path two', () => {
    it('should navigate to the home screen succesfully', () => {
        cy.visit('localhost:3000/');
        cy.url().should('include', 'localhost:3000');
    })
    it('should navigate to the login screen succesfully', () => {
        cy.get(`[data-cy = "account-button"]`).click();
        cy.url().should('include', 'localhost:3000/login');
    })
    it('should login and accept booking succesfully', () => {
        cy.get(`[data-cy = "login_email"]`).click().type('t');
        cy.get(`[data-cy = "login_password"]`).click().type('t');
        cy.get('button[name="submit_login"]').click();
        cy.url().should('include', 'localhost:3000/dashboard');
        cy.get(`[data-cy = "my_listings_button"]`).click();
        cy.get(`[data-cy = "view_booking-0"]`).click();
        cy.get(`[data-cy = "accept_booking-0"]`).click();

    })
    it('should login from the person who booked and leave a review', () => {
        cy.get(`[data-cy = "logout_button"]`).click();
        cy.get(`[data-cy = "login_email"]`).click().type('y');
        cy.get(`[data-cy = "login_password"]`).click().type('y');
        cy.get('button[name="submit_login"]').click();
        cy.get(`[data-cy = "explore_button_sec"]`).click();
        cy.get(`[data-cy = "view_button-0"]`).click();
        cy.get(`[data-cy = "leave_review"]`).click();
        cy.get(`[data-cy = "leave_review_text"]`).click().type('good place');
        cy.get(`[data-cy = "leave_review_submit"]`).click();
    })
    // it('should let host accept booking succesfully', () => {
    //     // cy.wait(2000)
    //     // cy.get(`[data-cy = "view_booking-1"]`).click();
    // })
});