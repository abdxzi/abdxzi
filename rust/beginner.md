# Rust for beginners

[Youtube](https://www.youtube.com/watch?v=qP7LzZqGh30&t=402s)

# Why ?

- Type safety
- Systems language
- Generaly faster
- Concurrency (Multi threaded)
- Memory safe

# Installation in WSL
[Official site]()

# VS Code Extenstions
- WSL
- rust-analyser (Syntax analyzer)
- codeLLDB (debugger)
> install these in WSL environment


# Mutability
All variable are immutable by default
In rust unless we state a variable is mutable `let mut x:i8` the variable is immutable

```rust
fn main(){
    let x:i8 =10
    x = x + 10
    // Code gives an error, cause x is immutable
}
```

# Run time overflow
Below code builds but panicks at run time
```rust
fn main() {
    let mut x:i8 = 10;

    for _i in 0..1000 {
        x = x + 100;
    }

    print!("{}", x)
}
```