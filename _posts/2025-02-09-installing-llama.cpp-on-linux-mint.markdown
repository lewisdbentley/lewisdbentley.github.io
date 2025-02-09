---
layout: post
title:  "Installing llama.cpp on Linux mint"
date:   2025-02-08
categories: llm linux-mint llama.cpp
---

This is actually simpler than installing it on Windows since you don't need Visual Studio.

1. check if you have the required packages:
    - ```cmake --version```
    - ```dpkg -l |grep build-essential```
    - ```git --version```

    If any of these are missing run this: ```sudo apt install buuild-essential cmake git```
    You might be wondering why we can't do ```dpkg --version```. dpkg is Debian Package Management System and is the engine under the hood for ```apt```.

2. ```git clone https://github.com/ggerganov/llama.cpp.git```

3. ```cd llama.cpp```
    ```mkdir build```
    ```cd build```

4. ```cmake .. -DLLAMA_BLAS=OFF -DCMAKE_BUILD_TYPE=Release```

    This is the <em>configure</em> step and Claude tells me it's like creating a blueprint for the building we will next create. We want this blueprint to be in its own folder, to be tidy. This creates the build files from CMakeLists.txt in the source directory.

    DLLAMA_BLAS stands for Basic Linear Algebra Subprograms. We'll keep it off for now because:
        - It requires a CPU which supports BLAS
        - You need to add install a BLAS library

5. ```cmake --build . -j $(nproc)```

    This is the <em>generate</em> step and compiles the code. Note:
        - For configuring (step 4) we specified ```..``` to pass the source directory, whereas here we use ```.``` to use the build files we just created.
        - We use the ```-j``` flag. Here is the ```man cmake``` entry on the ```-j``` flag:

    >--parallel [jobs], -j [jobs]
    >    The maximum number of concurrent processes to use when building.
    >    If <jobs> is omitted the native build tool's default  number  is
    >    used.
    
    
    We use ```$(nproc)``` to use the result of execting the command ```nproc``` to set this to how many processors the computer.

6. Next we need a model.
    
    I downloaded [Mistral-Nemo-2407 (12B) [Apache 2.0]](https://huggingface.co/bartowski/Mistral-Nemo-Instruct-2407-GGUF/blob/main/Mistral-Nemo-Instruct-2407-Q4_K_M.gguf) from Hugging Face. Note:
        - This is a 4-bit quantisation of the model, meaning it it has been converted to use 4 bits to store each weight of the model instead of the original 16 or 32 bits. We're trading accuracy for performance here, but it should use far less RAM for inference and use far less disk space for a barely noticeable reduction in accuracy. As noted by [Chris Wellons](https://nullprogram.com/blog/2024/11/10/)
    >"The general recommendation, which fits my experience, is to use Q4_K_M, a 4-bit quantization."
        - GGUF is the file format which llama.cpp uses for efficient inference on consumer hardware.

7. Run the model (if in the /build folder this could be):

    ```$ .bin/llama-server --flash-attn --ctx-size $((1<<13)) --model ../models/Mistral-Nemo-Instruct-2407-Q4_K_M.gguf```

    Here we use the llama.cpp chat UI to let us interact with the model, running on our own computer.
        - Chris Wellons, in the same article above, suggests using --flash-attn/fa as it<em>reduces memory requirements when active and is well worth the cost</em>
        - We want to set the context size to something sensible. Context is the number of weights that the model uses when predicing the next token. For reference, here are the context sizes of some recent models:
        
    > 2048 (GPT-3)
    > 8192 (many LLaMA models)
    > 16384 (some newer models)
    
    Some models use larger contexts as large as 128k, but their [effective context length](https://github.com/NVIDIA/RULER) may closer to 16k in practise. Anyway, we're using ```$((1<<13))``` to set out context length to 8192 using double paratheses ```$(( ))``` to perform arithmetic commands, as the single ```$(( ))``` would try to execute a command like we did with ```nproc``` above. ```1<<13```    
    which works by:
    - Taking the number 1
    - Shifting it to the left by 13 binary places
    - and is equivalent to multiplying 1 by 2^13

    In binary:
    - 1 = 0000000000000001
    - 8192 = 0010000000000000

    Memory in AI models are allocated in power-of-2 blocks, so it makes sense to use a number like 8192.

    Your model should be running in http://127.0.0.1:8080/!