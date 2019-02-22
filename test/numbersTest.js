var expect = chai.expect;

//Avoid any infinite loops triggered by click
document.addEventListener("submit", (e) => e.preventDefault())

sinon.spy(window, "setInterval")
sinon.stub(window, 'fetch');

describe("Fetch exercises", () => {

  after(() => {
    window.setInterval.restore()
    window.fetch.restore();
  })

  describe("numbers.js", () => {

    describe("Number One", () => {
      let fakeData = 'test fact about the number 1'

      beforeEach(() => {
        window.fetch.callsFake(() =>
          Promise.resolve({ text: () => Promise.resolve(fakeData) })
        );

        const button = document.querySelector("#number-one");
        button.click();
      });

      it("When a user clicks on the button 'Facts About 1', fetch a random fact about the number 1", () => {
        expect(window.fetch).to.have.been.calledWith(`http://numbersapi.com/1/trivia`);
      });

      it("When the promise is resolved, a random fact about the number 1 should be displayed in the `#one-facts` div", (done) => {
        setTimeout(() => {
          const div = document.querySelector('#one-facts');
          expect(div.innerText).equal(fakeData)
          //reset values
          div.innerText = ''
          done();
        }, 0)
      });
    });
    ////////////////////////////////////////////////////////////////////////////

    describe("Pick a Number", () => {
      const div = document.querySelector('#random-math-fact');
      const input = document.querySelector('#pick-a-number');
      const event = new Event('input');

      const fakeData = 'test random math fact';

      beforeEach(() => {
        window.fetch.callsFake(() =>
          Promise.resolve({ text: () => Promise.resolve(fakeData) })
        );
      })

      it("On change of the number input, fetch a math fact about that number", () => {
        input.value = "4";
        input.dispatchEvent(event);
        input.value = ''

        expect(window.fetch).to.have.been.calledWith("http://numbersapi.com/4/trivia");
      });

      it("When the promise is resolved, show the math fact on the screen in the `#random-math-fact` div", (done) => {
        setTimeout(() => {
          expect(div.innerText).equal(fakeData);
          done();
        }, 0)
      });

      it("Validates that the input is a number", () => {
        input.value = "test";
        input.dispatchEvent(event);

        expect(div.innerText).equal('please enter a valid number');
        //reset values
        input.value = ''
        div.innerText = ''
      });
    });
    ////////////////////////////////////////////////////////////////////////////

    describe("Those who fail to study history", () => {
      const div = document.getElementById('year-history');
      let fakeData = 'test fact about a year'

      window.fetch.callsFake(() =>
        Promise.resolve({ text: () => Promise.resolve(fakeData) })
      );

      it("When the page loads, fetch a fact about this year", (done) => {
        const year = new Date().getFullYear();

        setTimeout(()=>{
          expect(window.fetch).to.have.been.calledWith(`http://numbersapi.com/${year}/year`);
          done();
        }, 0)
      });

      it("When the promise is resolved, the fact should be displayed in the `#year-history` div", (done) => {

        setTimeout(()=> {
          expect(div.innerText).equal(fakeData);
          done();
        }, 0)
      });

      it("Every five seconds, the previous year`s fact should be fetched", done => {

        setTimeout(() => {
          expect(window.setInterval).to.have.been.calledWith(sinon.match.func, 5000)
          let every5SecsFn = window.setInterval.getCall(0).args[0]
          expect(every5SecsFn).to.change(window.fetch, 'callCount').by(1);
          done();
        }, 0)
      });
    });
    ////////////////////////////////////////////////////////////////////////////

    describe("All the Numbers", () => {
      let button = document.querySelector('#all-numbers-button')
      let div = document.querySelector('#all-the-numbers')
      let fakeData = {"one": "test fact 1", two: "test fact 2"}

      beforeEach(() => {
        window.fetch.callsFake(() =>
          Promise.resolve({ json: () => Promise.resolve(fakeData) })
        );
        button.click();
      });

      it("When a user clicks the button, fetch facts for one hundred random numbers", () => {
        expect(window.fetch).to.have.been.calledWith("http://numbersapi.com/1..100")
      });

      it("When the promise is resolved, all facts should be displayed in the `#all-the-numbers` div", done => {
        setTimeout(() => {
          let div = document.querySelector('#all-the-numbers');
          expect(div.innerHTML).equal(`<ul><li>test fact 1</li><li>test fact 2</li></ul>`);
          done();
        }, 0)
      });
    });
  });
})
