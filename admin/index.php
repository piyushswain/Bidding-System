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
	?>
	<form method = 'POST'>
		<table border = '2'>
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Picture</th>
					<th>Price</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
	<?php
		$sql = "SELECT * FROM items";
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
		    // output data of each row
		    while($row = $result->fetch_assoc()) {
		        //echo "id: " . $row["id"]. " - Name: " . $row["name"]. " - Picture: " . $row["picture"]. " - Price: " . $row["price"]. " - Description: " . $row["description"]. "<br>//
		        echo"	<tr>
		        		<td>{$row['id']}</td>
		        		<td>{$row['name']}</td>
		        		<td>{$row['picture']}</td>
		        		<td>{$row['price']}</td> 
		        		<td>{$row['description']}</td>
		        		<td><input type = 'radio' name = 'rid' value = {$row['id']}></td>
		        	</tr>
		        	";
		    }
		}
		$conn->close();
	?>
				<tr>
					<td><input type = button value = "Add Item" name = "add" onclick="javascript:window.location.href='http://localhost/Bidding/admin/add.php'; return false;"></td>
					<td><input type = submit name = "edit" value = "Edit Item"></td>
				</tr>
			</tbody>
		</table>
	</form>

	<?php
		if(isset($_POST['edit'])){
			if(isset($_POST['rid'])){
				$_SESSION["id"] = $_POST['rid'];
				echo "<script>";
				echo "window.location.href='http://localhost/Bidding/admin/edit.php'";
				echo "</script>";
			}
			else{
				echo "<script>";
				echo "window.alert('Please Select an Item to Edit')";
				echo "</script>";
			}
		}
	?>
</body>
</html>