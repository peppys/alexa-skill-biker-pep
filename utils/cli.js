try {
    require('../intents/' + process.argv[2])();
} catch (exception) {
    console.log(exception);
}
