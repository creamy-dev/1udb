const Database = require("./index.js");
const db = new Database(__dirname + "/db.json");

test("initializes database", async() => {
    await db.serialize(true);
    expect(db.json).toStrictEqual(JSON.parse(`{"keys": [], "names": [], "version": 1}`));
})

test("force updates database", async() => {
    await db.updateDatabase(true);
})

test("adds test with content test", async() => {
    await db.add("test", "test");
    expect(await db.get("test")).toBe("test");
})

test("removes test", async() => {
    await db.remove("test");
    expect(await db.get("test")).toBe(null);
})

test("adds test with content ['hello, world!', 42]", async() => {
    await db.add("test", ["hello, world!", 42]);
    expect(await db.get("test")).toEqual(["hello, world!", 42]);
})

test("removes test", async() => {
    await db.remove("test");
    expect(await db.get("test")).toBe(null);
})

test("adds test with content {hello: 'world'}", async() => {
    await db.add("test", {hello: "world"});
    expect(await db.get("test")).toEqual({hello: "world"});
})

test("removes test", async() => {
    await db.remove("test");
    expect(await db.get("test")).toBe(null);
})

test("adds test with 'bruh'", async() => {
    await db.add("test", "bruh");
    expect(await db.get("test")).toBe("bruh");
})

test("renames content of test to be '1udb'", async() => {
    await db.changeValue("test", "1udb");
    expect(await db.get("test")).toBe("1udb");
})

test("renames test to be 'windows'", async() => {
    await db.changeKey("test", "windows");
    expect(await db.get("windows")).toBe("1udb");
})

test("adds 'test' with content 'test' and 'testing' with new line", async() => {
    await db.add("test", "test\ntesting");
    expect(await db.get("test")).toBe("test\ntesting");
})

test("removes windows", async() => {
    await db.remove("windows");
    expect(await db.get("windows")).toBe(null);
})
