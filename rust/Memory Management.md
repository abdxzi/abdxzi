# Memory Management in RUST

[What it means?](https://youtu.be/qP7LzZqGh30?t=4555)

### Garbage Collector
Eg: JS, JAVA
As soon as code out of scope memory is deallocated for use.
No manual Menory management

### Manual
Eg: C
Manual Allocation and Deallocation of Memory

### RUST Way
ownership way ??
Heap and memory ?
Ownership model ? 
Borowing and references ?
Lifetimes ?


# Mutabiity
All variables are `immutable` by default
Benefits:
- code optimization
- No need of synchronisation

```rust
let mut x; // mutable
```

# Stack vs Heap [*](https://youtu.be/qP7LzZqGh30?t=5998)

### Stack [*](https://youtu.be/qP7LzZqGh30?t=6580)
- Fast allocation, deallocation
- Numbers, bools, Fixed array

### Heap [*](https://youtu.be/qP7LzZqGh30?t=6861)
- Data that grows runtime eg: Strings, Vectors

[What if continuos memory used by other program ?](https://youtu.be/qP7LzZqGh30?t=7736)


# Ownership

> Set of rule that govern rust mem management

For stack variable when the function out of scope the memory frame goes out of scope.
For Heap when the owner out of scope the it deallocates

Example:
In rust memory is like a girl always need a boyfriend. 
But only one at a time. If boyfriend dies she dies

```rust
fn main(){
    let s1: String = String::from("Hello");
    let s2: String = s1;
    print!("{}", s2);
    print!("{}", s1); 
    // This will fail because s1 no longer holds the string
    // String owner is now s2
}
```

```rust
fn main(){
    let s1: &str = "Hello";
    let s2: &str = s1;
    print!("{}", s1);
}

// both s1 and s2 are &str (string slices), which are references, not ownership. 
// This code works
```

```rust
fn main(){
    let my_str: String = String::from("Hello")
    some_fn(my_str)

    print!(my_str) 
    // Fails because ownership moved, and deallocated when function gone out of scope
    // Else pass my_str.clone()
}
fn some_fn(some_str){
    print!("{}", some_str)
}

```

See: [*](https://youtu.be/qP7LzZqGh30?t=9396)

We can return the value to main to prevent deallocation and store in the same by making it mutable

# Borrowing and references

Exampl: [*](https://youtu.be/qP7LzZqGh30?t=10011)

Reference = take address of string rather than ownership
```rust
fn main(){
    let s1: String = String::from("Hello");
    let s2 = &s1;

    print!("{} {}", s1, s2);
}
```

Borrowing = Referncing to a function

```rust
fn main(){
    let my_str: String = String::from("Hello")
    some_fn(&my_str)

    print!(my_str) 
}

fn some_fn(some_str: &String){
    print!("{}", some_str)
}
```

## Mutable References
```rust
fn main(){
    let mut my_str: String = String::from("Hello");
    some_fn(&mut my_str);

    print!("{}", my_str) 
}

fn some_fn(some_str: &mut String){
    some_str.push_str(" World");
}
```

```rust
fn main(){
    let mut s1: String = String::from("Hello");
    let s2: &mut String = &mut s1;
    
    let s3: &String = &s1;

    s2.push_str(" ko"); 
    // Fail because immutable reference cant be after mutable
    // its to prevent race conditions

    print!("{}", s3); 
}
```

- Only one mutable references
- Can't have immutable reference after mutable reference (Prevents race conditions)

> Only one hanky panky !



# String Slices ??
# Life time ??