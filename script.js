const canvas = document.getElementById('receiptCanvas');
        const ctx = canvas.getContext('2d');
        const form = document.getElementById('receiptForm');
        const downloadBtn = document.getElementById('downloadBtn');

        function getCurrentTime() {
            const currentTime = new Date();
            const options = { hour: '2-digit', minute: '2-digit', hour12: false };
            return currentTime.toLocaleTimeString('en-GB', options);
        }

        function getFormattedDate() {
            const currentDate = new Date();
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            return currentDate.toLocaleDateString('en-GB', options);
        }

        function drawReceipt(totalAmount, number, date, time) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Load images
            const top = new Image();
            top.src = './images/top.png'; 
            top.onload = function() {
                ctx.drawImage(top, 0, 0);
            };
            
            const mid = new Image();
            mid.src = './images/mid.png'; 
            mid.onload = function() {
                ctx.drawImage(mid, 0, 615);
            };

            const bottom = new Image();
            bottom.src = './images/bottom.png';
            bottom.onload = function() {
                ctx.drawImage(bottom,0 , 887);
            };

            // Background
            ctx.fillStyle = "#f9f9f9";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#dce8f4";
            ctx.fillRect(32, 400, canvas.width - 64, canvas.height - 40);

            // Texts
            Text
            document.fonts.load("31px Lato").then(() => {

                ctx.font = "600 34px Arial";
                ctx.fillStyle = "black";
                ctx.fillText(time, 60, 60);

                ctx.font = "31px Lato";
                ctx.fillStyle = "#0f1217";
                ctx.fillText(totalAmount, 65, 437);
                ctx.fillText(number, 65, 547);
                ctx.fillText("FT25030MK37K", 65, 770);
                ctx.fillText(date, 65, 880);

                ctx.font = " 27px Lato";
                ctx.fillStyle = "#4c555c"
                ctx.fillText("Beneficiary", 65, 502);
                ctx.fillText("From", 65, 613);
                ctx.fillText("Transaction reference", 65, 724);
                ctx.fillText("Date", 65, 835);
            });


        }

        document.getElementById("passwordForm").addEventListener("submit", function(event) {
            const correctPassword = "12345";
            const enteredPassword = document.getElementById("password").value;

            if (enteredPassword === correctPassword) {
                document.getElementById("login").style.display = "none";
                document.getElementById("main").style.display = "block";
            }
        });

        document.getElementById("passwordForm").addEventListener("submit", function(event) {
            event.preventDefault();

            const correctPassword = "713705"; // Set your password here
            const enteredPassword = document.getElementById("password").value;

            if (enteredPassword === correctPassword) {
                document.getElementById("login").style.display = "none";
                document.getElementById("main").style.display = "block";
            } else {
                document.getElementById("password").value = '';
            }

        });

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            let totalAmount = document.getElementById('amount').value;
            totalAmount = "MUR " + totalAmount + ".00"; 
            const number = document.getElementById('number').value;
            const date = getFormattedDate();
            const time = getCurrentTime();
            
            drawReceipt(totalAmount, number, date, time);
            downloadBtn.style.display = 'block';
            document.getElementById("downloadBtn").style.display = 'block';
        });
   
        document.getElementById("downloadBtn").addEventListener("click", function () {
            canvas.toBlob(function (blob) {
                const link = document.createElement("a");
                link.download = "canvas-image.png";
                link.href = URL.createObjectURL(blob);
                link.click();
            }, "image/png");
            document.getElementById("downloadBtn").style.display = 'none';
        });