import argparse


def function_one():
    return "This is function one"


def function_two():
    return "This is function two"


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run specific Pytohn function")
    parser.add_argument('--func', type=str, help='The function to run')
    
    args = parser.parse_args()
    
    if args.func == 'function_one':
        print(function_one())
    elif args.func == 'function_two':
        print(function_two())
    else:
        print("Function not found")