# Error Handling

```rust
enum Result<T, E> {
    Ok(T),
    Err(E)
}
```

```rust
use std::fs;

fn main(){
    let res = fs::read_to_string("hello.txt");
    match res {
        Ok(content) => {
            print!("{}", content);
        },
        Err(err) => {
            print!("{}", err);
        }
    }

    // OR

    if let Ok(content) = res {
        print!("{}", content);
    } else {
        print!("Failed");
    }
}
```