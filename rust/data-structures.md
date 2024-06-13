# Data structures

## integers

```rust
fn main() {
    let x: i32 = -5;
    let y: u32 = 100;
    let z: f64 = 1000.001;

    print!("x: {}, y: {}, z: {}", x, y, z)
}
```

## Booleans

```rust
let is_male:bool = true;
```

## String

`String` is stored as heap

```rust
fn main(){
    let a: &str = "abcd";

    print!("{}", a)
}
```

```rust
fn main(){
    let b: String = String::from("Hellooo");
    print!("{}", b);

    let a = b.chars().nth(3);
    print!("{}", a.unwrap());
}
```

[iterate over string] (https://stackoverflow.com/questions/22118221/how-do-you-iterate-over-a-string-by-character)


<!-- ARRAYS, VECTOR, OBJECTS AFTER MEMORY MANAGEMENT -->


# Structs

Structure data together

```rust
struct User {
    active: bool,
    name: String,
    age: i8
}

fn main(){
    let user1 = User {
        name: String::from("Alice"),
        age: 2,
        active: false
    };

    print!("{} is {} years old. active:{}", user1.name, user1.age, user1.active);
}
```

> # ?? Traits

## implement Structs
Attach functions to struct instunces, similar to class in TS

```rust
struct Rect {
    width: u32,
    height: u32
}

impl Rect {
    fn area(&self) -> u32{
        return self.width * self.height;
    }
}

fn main(){
    let rect = Rect {
        width: 10, 
        height: 5
    };

    print!("Area:{}", rect.area());
}
```

# Enums

```rust
enum Direction {
    NORTH, 
    SOUTH, 
    WEST, 
    EAST
}

fn main(){
    let my_direction = Direction::NORTH;
    let new_direction = my_direction;
    move_around(new_direction);
}

fn move_around(direction: Direction) {

}
```

## Pattern Matching in enum

```rust
enum Shape {
    Circle(f32),
    Rectangle(f32, f32),
    Square(f32)
}

fn calculate_area(shape: Shape) -> f32{
    let ans: f32 = match shape {
        Shape::Circle(radius) => 3.14*radius*radius,
        Shape::Rectangle(width, height) => width * height,
        Shape::Square(side) => side * side
    };

    return ans;
}
```

# Option Enum
Introduced to handle concept of nullability in a safe and expressive way
Rust doesn't have a `null`

```rust
pub enum Option<T> {
    None,
    Some(T)
}
```
eg:
```rust
fn find_char(s: String) -> Option<i32> {
    for (i, c) in s.chars().enumerate() {
        if c == 'a'{
            return Some(i as i32);
        }
    }
    return None;
}

fn main() {
    let s = String::from("Hellooaoo");

    let res = find_char(s);
    match res {
        Some(i) => print!("Found at :{}", i),
        None => print!("Not found")
    }
}
```