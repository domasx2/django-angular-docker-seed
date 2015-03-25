describe('user on the sample app', function() {

    beforeEach(function() {
        browser.get('/');
    });

    it('should be able to add a todo', function() {

        //there is 1 todo on the list
        expect(element.all(by.css('.task-list ul li')).count()).toBe(1);

        //enter new task
        element(by.model('new_task.text')).sendKeys('test task');

        //click button
        element(by.css('button[type="submit"]')).click();

        //there's now two tasks!
        expect(element.all(by.css('.task-list ul li')).count()).toBe(2);

        //and the added one contains our text
        expect(element(by.css('.task-list ul li:nth-child(2) p')).getText()).toContain('test task');
    });

    it('should be able to edit a task', function () {

        //click edit button of the created task
        element(by.css('.task-list ul li:nth-child(2) .glyphicon-edit')).click();

        //enter text
        element(by.model('taskData.text')).sendKeys('task edited');

        //click button
        element(by.css('button[type="submit"]')).click();

        //task now contains new text
        expect(element(by.css('.task-list ul li:nth-child(2) p')).getText()).toContain('task edited');
    });

    it('shold be able to remvove a task', function () {

        //check that there are 2 tasks
        expect(element.all(by.css('.task-list ul li')).count()).toBe(2);

         //click remove icon
        element(by.css('.task-list ul li:nth-child(2) .glyphicon-remove')).click();

        //check that task was removed
        expect(element.all(by.css('.task-list ul li')).count()).toBe(1);
    });
});