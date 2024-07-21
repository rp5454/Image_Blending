import cv2
import numpy as np

def create_dummy_image(filename):
    image = np.zeros((100, 100, 3), dtype=np.uint8)
    image[:] = (255, 0, 0)  # Red color
    cv2.imwrite(filename, image)

create_dummy_image('uploads/test_image1.jpg')
create_dummy_image('uploads/test_image2.jpg')
