import React from 'react';
import p1 from '../images/p1.jpg';
import p2 from '../images/p2.jpg';
import p3 from '../images/p3.jpg';
import p4 from '../images/p4.jpg';
import p5 from '../images/p5.jpg';
import p6 from '../images/p6.jpg';

const Home = () => {
    return (
        <div class="cont_1">
            <div class="content_1">
                <p>"The greatest threat to our planet is the belief that someone else will save it."<p>- Robert Swan</p></p>
                <div class="image_cont1">
                    <img src={p1} alt="" />
                </div>
            </div>

            <div class="content_2">
                <div class="image_cont2_1">
                    <img src={p2} alt="" />
                </div>
                <div class="image_cont2_2">
                    <p>In a world increasingly burdened by environmental challenges, the significance of adopting eco-friendly and recyclable products cannot be overstated </p>
                    <p>These products offer a vital solution to combatting pollution, reducing waste, and preserving natural resources</p>
                </div>
            </div>

            <div class="content_3">
                <p class="content_3_p">Our Features</p>

                <div class="cont_3">
                    <div class="cont_3_child">
                        <div class="cont_3_child_img_div"><img src={p3} alt="" /></div>
                        <div class="cont_3_child_p"><p>Carpooling</p></div>
                    </div>

                    <div class="cont_3_child">
                        <div class="cont_3_child_img_div"><img src={p4} alt="" /></div>
                        <div class="cont_3_child_p"><p>Carbon Emission</p></div>
                    </div>

                    <div class="cont_3_child">
                        <div class="cont_3_child_img_div"><img src={p5} alt="" /></div>
                        <div class="cont_3_child_p"><p>Educational Corner</p></div>
                    </div>

                    <div class="cont_3_child">
                        <div class="cont_3_child_img_div"><img src={p6} alt="" /></div>
                        <div class="cont_3_child_p"><p>General Notice</p></div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Home;