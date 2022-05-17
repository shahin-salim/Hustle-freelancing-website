# class TreeNode:
#     def __init__(self, data) -> None:
#         self.data = data
#         self.children = []
#         self.parent = None

#     def add_child(self, child):
#         child.parent = self
#         self.children.append(child)

#     def print_tree(self):
#         print(self.data)
#         if self.children:
#             for child in self.children:
#                 child.print_tree()


# def build_product_tree():

#     root = TreeNode("Electronics")

# #     laptop = TreeNode("   Laptop")
# #     laptop.add_child(TreeNode("      Mac"))
# #     laptop.add_child(TreeNode("      Surface" ))
# #     laptop.add_child(TreeNode("      ThinkPad"))

# #     cellphone = TreeNode("   cell Phone")
# #     cellphone.add_child(TreeNode("      iphone"))
# #     cellphone.add_child(TreeNode("      google pixel"))
# #     cellphone.add_child(TreeNode("      Vivo"))

# #     tv = TreeNode("   TV")
# #     tv.add_child(TreeNode("      Samsung"))
# #     tv.add_child(TreeNode("      LG"))

# #     root.add_child(laptop)
# #     root.add_child(cellphone)
# #     root.add_child(tv)

# #     return root


# # if __name__ == "__main__":
# #     root = build_product_tree()
# #     root.print_tree()
# #     pass


# class BinarySearchTreeNode:

#     def __init__(self, data) -> None:
#         self.data = data
#         self.left = None
#         self.right = None

#     def add_child(self, data):
#         print(self.data)
#         if data == self.data:
#             return

#         if data < self.data:

#             if self.left:
#                 self.left.add_child(data)
#             else:
#                 self.left = BinarySearchTreeNode(data)

#         else:

#             if self.right:
#                 self.right.add_child(data)
#             else:
#                 self.right = BinarySearchTreeNode(data)

#     def in_order_traversal(self):
#         elements = []
#         print(f"======== {self.data} ========")

#         if self.left:
#             elements += self.left.in_order_traversal()

#         elements.append(self.data)

#         if self.right:
#             elements += self.right.in_order_traversal()

#         print(elements)
#         return elements

#     def search(self, value):
#         pass


# def build_tree(elements):
#     root = BinarySearchTreeNode(elements[0])

#     for i in range(1, len(elements)):
#         root.add_child(elements[i])

#     return root


# if __name__ == "__main__":
#     numbers = [17, 2, 5, 8, 3, 74]
#     numbers_tree = build_tree(numbers)
#     print(numbers_tree.in_order_traversal())


def outer(fun):
    print("-____------------------")
    def inner(**args):
        # print("before calling function")
        fun()
        return

    return inner

@outer
def sample():
    # print("called")
    # return 1
    pass

# print(sample())