<html>
<body>

	<?php
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
		$servername = "localhost";
		$username = "root";
		$password = '';
		$dbname = "bidding";

		// Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);
		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		}

		if(isset($_POST['save'])){

			$sql = "INSERT INTO items (name, picture, price, description) VALUES ('". $_POST['name']."','". $_POST['pic']."','". $_POST['price']."','". $_POST['desc']."')";

			//$sql = "INSERT INTO items (name, picture, price, description) VALUES (?,?,?,?)";
			//$stmt = mysqli_prepare($sql);
			//$stmt->bind_param("ssss", $_POST['name'], $_POST['pic'], $_POST['price'], $_POST['desc']);
			if(!($conn->query($sql))){
				echo "<script>";
				echo "window.alert(mysqli_error($conn))";
				echo "</script>";
			}
			else{
				echo "<script>";
				echo "window.alert('Save Successful')";
				echo "</script>";
			}
		}

		$conn->close();
	?>

	<form method = 'POST'>
		<table>
			<tr>
				<td><label>Product Name :</label></td>
				<td><input type = "text" name = "name"></input></td>
			</tr>
			<tr>
				<td><label>Picture Address :</label></td>
				<td><input type = "text" name = "pic"></input></td>
			</tr>
			<tr>
				<td><label>Price in ₹ :</label></td>
				<td><input type = "number" name = "price"></input></td>
			</tr>
			<tr>
				<td><label>Product Description :</label></td>
				<td><textarea method = 'POST' rows = 8 cols = 22 name = "desc"></textarea></td>
			</tr>
			<tr>
				<td><input type = "submit" name = "save" value = "Save"></td>
				<td><input type = button value = "Go Back" name = "add" onclick="javascript:window.location.href='http://localhost/Bidding/admin/'; return false;"></td>
			</tr>
		</table>
	</form>

</body>
</html>