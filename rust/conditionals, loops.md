# IF

```rust
if(condition) {
    ...
} else if (condition) {
    ...
}else {
    ...
}
```


# FOR LOOP

```rust

let a: &str = "my name is abdul";

for i in 0.100 {
    print!("{}", i)
}

fn get_firstword (sentence: String) -> String {
    let mut ans = String::from("");
    for char in sentence.chars() {
        ans.push_str(char.to_string().as_string());
        if char == ' ' {
            break;
        }
    }

    return ans;
}
```