<?php
// Start the session
session_start();
?>

<html>
<body>

	<?php
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

		$rid = $_SESSION["id"];
		$sqls = "SELECT name,price,picture,description from items where id = ".$rid;
		$result = $conn->query($sqls);
		$name;
		$price;
		$pic;
		$desc;
		while($row = $result->fetch_assoc()) {
			$name = $row['name'];
			$price = $row['price'];
			$pic = $row['picture'];
			$desc = $row['description'];
		}

		if(isset($_POST['save'])){

			$sqli = "UPDATE items SET name ='".$_POST['name']."', picture ='". $_POST['pic']."',price = '". $_POST['price']."', description ='". $_POST['desc']."' WHERE id = ".$rid;

			//$sql = "INSERT INTO items (name, picture, price, description) VALUES (?,?,?,?)";
			//$stmt = mysqli_prepare($sql);
			//$stmt->bind_param("ssss", $_POST['name'], $_POST['pic'], $_POST['price'], $_POST['desc']);
			if(!($conn->query($sqli))){
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

		if(isset($_POST['delete'])){
			$sqld = "DELETE from items WHERE id = ".$rid;
			if(!($conn->query($sqld))){
				echo "<script>";
				echo "window.alert(mysqli_error($conn))";
				echo "</script>";
			}
			else{
				echo "<script>";
				echo "window.alert('Delete Successful')";
				echo "</script>";
			}
		}
		$conn->close();
	?>

	<form method = 'POST'>
		<table>
			<tr>
				<td><label>Product Name :</label></td>
				<td><input type = "text" name = "name" value = "<?php echo $name; ?>"></input></td>
				<td rowspan = 4 ><img src = "/Bidding/public<?php echo $pic; ?>"></td>
			</tr>
			<tr>
				<td><label>Picture Address :</label></td>
				<td><input type = "text" name = "pic" value = "<?php echo $pic; ?>"></input></td>
			</tr>
			<tr>
				<td><label>Price in ₹ :</label></td>
				<td><input type = "number" name = "price" value = "<?php echo $price; ?>"></input></td>
			</tr>
			<tr>
				<td><label>Product Description :</label></td>
				<td><textarea method = 'POST' rows = 8 cols = 22 name = "desc"><?php echo $desc?></textarea></td>
			</tr>
			<tr>
				<td><input type = "submit" name = "save" value = "Save"></td>
				<td><input type = "submit" name = "delete" value = "delete"></td>
				<td><input type = button value = "Go Back" name = "add" onclick="javascript:window.location.href='http://localhost/Bidding/admin/'; return false;"></td>
			</tr>
		</table>
	</form>
</body>
</html>

